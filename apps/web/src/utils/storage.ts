/**
 * LocalStorage Utility
 *
 * Provides a type-safe wrapper around the browser's localStorage API with:
 * - Automatic JSON serialization/deserialization
 * - Error handling for quota exceeded scenarios
 * - Type safety with TypeScript generics
 * - Fallback mechanisms for private/incognito browsing
 * - Item expiration support
 */

type StorageListener<T> = (value: T | null) => void;

interface StorageOptions {
  version?: number;
  prefix?: string;
}

interface StorageItem<T> {
  value: T;
  timestamp: number;
  expiresIn?: number;
}

export class Storage {
  private prefix: string;
  private version: number;
  private listeners: Map<string, Set<StorageListener<any>>>;
  private isAvailable: boolean;

  constructor(options: StorageOptions = {}) {
    this.prefix = options.prefix || 'app_';
    this.version = options.version || 1;
    this.listeners = new Map();
    this.isAvailable = this.checkStorageAvailable();
  }

  /**
   * Check if localStorage is available and writable
   */
  private checkStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Generate a prefixed key
   */
  private getKey(key: string): string {
    return `${this.prefix}v${this.version}_${key}`;
  }

  /**
   * Set an item in localStorage
   * @param key - The key to store the value under
   * @param value - The value to store (will be JSON stringified)
   * @param expiresIn - Optional expiration time in milliseconds
   * @returns true if successful, false otherwise
   */
  public set<T>(key: string, value: T, expiresIn?: number): boolean {
    if (!this.isAvailable) {
      console.warn('LocalStorage is not available');
      return false;
    }

    try {
      const storageItem: StorageItem<T> = {
        value,
        timestamp: Date.now(),
        ...(expiresIn && { expiresIn })
      };

      const prefixedKey = this.getKey(key);
      localStorage.setItem(prefixedKey, JSON.stringify(storageItem));

      this.notifyListeners(key, value);
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.error(`Storage quota exceeded for key: ${key}`);
      } else {
        console.error(`Failed to set storage item: ${key}`, error);
      }
      return false;
    }
  }

  /**
   * Get an item from localStorage
   * @param key - The key to retrieve
   * @param defaultValue - Optional default value if key doesn't exist or is expired
   * @returns The stored value or default value
   */
  public get<T>(key: string, defaultValue?: T): T | null {
    if (!this.isAvailable) {
      return defaultValue ?? null;
    }

    try {
      const prefixedKey = this.getKey(key);
      const item = localStorage.getItem(prefixedKey);

      if (!item) {
        return defaultValue ?? null;
      }

      const storageItem: StorageItem<T> = JSON.parse(item);

      // Check if item has expired
      if (storageItem.expiresIn) {
        const age = Date.now() - storageItem.timestamp;
        if (age > storageItem.expiresIn) {
          this.remove(key);
          return defaultValue ?? null;
        }
      }

      return storageItem.value;
    } catch (error) {
      console.error(`Failed to retrieve storage item: ${key}`, error);
      return defaultValue ?? null;
    }
  }

  /**
   * Check if a key exists in localStorage
   * @param key - The key to check
   * @returns true if key exists and is not expired
   */
  public has(key: string): boolean {
    if (!this.isAvailable) {
      return false;
    }

    try {
      const prefixedKey = this.getKey(key);
      const item = localStorage.getItem(prefixedKey);

      if (!item) {
        return false;
      }

      const storageItem: StorageItem<any> = JSON.parse(item);

      // Check if item has expired
      if (storageItem.expiresIn) {
        const age = Date.now() - storageItem.timestamp;
        if (age > storageItem.expiresIn) {
          this.remove(key);
          return false;
        }
      }

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Remove an item from localStorage
   * @param key - The key to remove
   * @returns true if successful, false otherwise
   */
  public remove(key: string): boolean {
    if (!this.isAvailable) {
      return false;
    }

    try {
      const prefixedKey = this.getKey(key);
      localStorage.removeItem(prefixedKey);
      this.notifyListeners(key, null);
      return true;
    } catch (error) {
      console.error(`Failed to remove storage item: ${key}`, error);
      return false;
    }
  }

  /**
   * Clear all items with this storage prefix
   * @returns true if successful, false otherwise
   */
  public clear(): boolean {
    if (!this.isAvailable) {
      return false;
    }

    try {
      const prefixPattern = `${this.prefix}v${this.version}_`;
      const keysToRemove: string[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefixPattern)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Failed to clear storage', error);
      return false;
    }
  }

  /**
   * Get all keys in this storage (without prefix)
   */
  public keys(): string[] {
    if (!this.isAvailable) {
      return [];
    }

    try {
      const prefixPattern = `${this.prefix}v${this.version}_`;
      const keys: string[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefixPattern)) {
          const unprefixedKey = key.substring(prefixPattern.length);
          keys.push(unprefixedKey);
        }
      }

      return keys;
    } catch (error) {
      console.error('Failed to get storage keys', error);
      return [];
    }
  }

  /**
   * Subscribe to changes for a specific key
   * @param key - The key to watch
   * @param listener - Callback function that receives the new value
   * @returns Unsubscribe function
   */
  public subscribe<T>(key: string, listener: StorageListener<T>): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }

    this.listeners.get(key)!.add(listener);

    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(key);
      if (listeners) {
        listeners.delete(listener);
      }
    };
  }

  /**
   * Notify all listeners for a key
   */
  private notifyListeners(key: string, value: any): void {
    const listeners = this.listeners.get(key);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(value);
        } catch (error) {
          console.error(`Error in storage listener for key: ${key}`, error);
        }
      });
    }
  }

  /**
   * Check if storage is available
   */
  public getIsAvailable(): boolean {
    return this.isAvailable;
  }

  /**
   * Get storage statistics
   */
  public getStats(): {
    isAvailable: boolean;
    itemCount: number;
    keys: string[];
  } {
    return {
      isAvailable: this.isAvailable,
      itemCount: this.keys().length,
      keys: this.keys()
    };
  }
}

// Export a default instance
export const storage = new Storage();
