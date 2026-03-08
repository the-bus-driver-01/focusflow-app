# @focusflow/web

A type-safe localStorage utility with comprehensive features and extensive test coverage.

## Overview

This project provides a robust, type-safe wrapper around the browser's localStorage API with:

- ✅ **Automatic JSON serialization/deserialization** - No manual JSON.stringify/parse needed
- ✅ **Type-safe generics** - Full TypeScript support with proper type inference
- ✅ **Error handling** - Graceful handling of quota exceeded and other errors
- ✅ **Item expiration** - Automatic cleanup of expired items
- ✅ **Prefix & version isolation** - Multiple storage instances can coexist
- ✅ **Fallback mechanisms** - Handles private/incognito browsing gracefully
- ✅ **Event subscriptions** - React to storage changes in real-time
- ✅ **Statistics tracking** - Get visibility into stored data

## Installation

```bash
npm install
```

## Quick Start

### Basic Usage

```typescript
import { storage } from './utils/storage';

// Set a value
storage.set('user', { id: 1, name: 'John' });

// Get a value with type safety
const user = storage.get<{ id: number; name: string }>('user');

// Check if key exists
if (storage.has('user')) {
  console.log('User data exists');
}

// Remove a value
storage.remove('user');

// Clear all storage
storage.clear();
```

### Advanced Features

#### Item Expiration

```typescript
// Store data that expires in 1 hour
storage.set('sessionToken', token, 60 * 60 * 1000);

// Expired items are automatically cleaned up on access
const token = storage.get('sessionToken', 'fallback');
```

#### Default Values

```typescript
// Return a default if key doesn't exist
const theme = storage.get('theme', 'light');
```

#### Subscriptions

```typescript
// Subscribe to changes
const unsubscribe = storage.subscribe('user', (user) => {
  console.log('User changed:', user);
});

// Unsubscribe when done
unsubscribe();
```

#### Multiple Storage Instances

```typescript
// Create isolated storage instances
const appStorage = new Storage({ prefix: 'app_', version: 1 });
const userStorage = new Storage({ prefix: 'user_', version: 1 });

// They don't interfere with each other
appStorage.set('key', 'app_value');
userStorage.set('key', 'user_value');
```

#### Get Statistics

```typescript
const stats = storage.getStats();
console.log('Items in storage:', stats.itemCount);
console.log('Keys:', stats.keys);
```

## API Reference

### Storage Class

#### Constructor

```typescript
constructor(options?: { prefix?: string; version?: number })
```

- **prefix**: Namespace prefix for keys (default: `'app_'`)
- **version**: Version number for schema migrations (default: `1`)

#### Methods

##### `set<T>(key: string, value: T, expiresIn?: number): boolean`

Store a value in localStorage.

- **key**: The storage key
- **value**: The value to store (will be JSON serialized)
- **expiresIn**: Optional expiration time in milliseconds
- **returns**: `true` on success, `false` on error

```typescript
storage.set('count', 42);
storage.set('session', { token: '...' }, 3600000); // 1 hour expiration
```

##### `get<T>(key: string, defaultValue?: T): T | null`

Retrieve a value from localStorage.

- **key**: The storage key
- **defaultValue**: Fallback value if key doesn't exist
- **returns**: The stored value, default value, or null

```typescript
const count = storage.get<number>('count', 0);
const session = storage.get<Session>('session');
```

##### `has(key: string): boolean`

Check if a key exists and is not expired.

```typescript
if (storage.has('user')) {
  const user = storage.get('user');
}
```

##### `remove(key: string): boolean`

Remove a key from localStorage.

```typescript
storage.remove('session');
```

##### `clear(): boolean`

Clear all items with this storage's prefix and version.

```typescript
storage.clear();
```

##### `keys(): string[]`

Get all keys in this storage (without prefix).

```typescript
const allKeys = storage.keys();
```

##### `subscribe<T>(key: string, listener: (value: T | null) => void): () => void`

Subscribe to changes for a specific key.

```typescript
const unsubscribe = storage.subscribe('user', (user) => {
  console.log('User updated:', user);
});

// Later: unsubscribe
unsubscribe();
```

##### `getIsAvailable(): boolean`

Check if localStorage is available.

```typescript
if (storage.getIsAvailable()) {
  storage.set('key', 'value');
}
```

##### `getStats(): { isAvailable: boolean; itemCount: number; keys: string[] }`

Get storage statistics.

```typescript
const stats = storage.getStats();
console.log(`Storing ${stats.itemCount} items`);
```

## Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

The test suite provides comprehensive coverage:

```
File        | % Stmts | % Branch | % Funcs | % Lines
------------|---------|----------|---------|--------
storage.ts  |  89.09  |    75    |   100   |  88.78
```

**54 passing tests** covering:

- ✅ Basic set/get/remove operations
- ✅ Data type handling (strings, numbers, objects, arrays, booleans, null)
- ✅ Item expiration and cleanup
- ✅ Default values and fallbacks
- ✅ Error handling (quota exceeded, JSON parsing errors)
- ✅ Multiple listeners and subscriptions
- ✅ Prefix and version isolation
- ✅ Complex nested objects and large datasets
- ✅ Storage availability detection
- ✅ Statistics tracking

## Building

### Build TypeScript

```bash
npm run build
```

This generates:
- `dist/utils/storage.js` - Compiled JavaScript
- `dist/utils/storage.d.ts` - TypeScript type definitions

## Browser Compatibility

The Storage utility works in all modern browsers that support localStorage:

- Chrome 4+
- Firefox 3.5+
- Safari 4+
- IE 8+
- Edge (all versions)

**Note:** In private/incognito browsing or when storage quota is exceeded, the utility gracefully handles errors and provides fallback behavior.

## Error Handling

The utility handles various error scenarios gracefully:

- **Storage unavailable** - Returns false for set(), null for get()
- **Quota exceeded** - Logs error and returns false
- **Invalid JSON** - Logs error and returns default value or null
- **Corrupted data** - Treats as missing and returns default value

```typescript
// Graceful error handling
const success = storage.set('key', value); // false on error
const value = storage.get('key', 'fallback'); // Returns fallback on error
```

## Project Structure

```
apps/web/
├── src/
│   └── utils/
│       ├── storage.ts          # Main Storage class
│       └── storage.test.ts     # Comprehensive test suite
├── dist/                       # Compiled output
├── coverage/                   # Test coverage reports
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── jest.config.js              # Jest testing configuration
└── README.md                   # This file
```

## Contributing

When making changes:

1. Update the utility code in `src/utils/storage.ts`
2. Update tests in `src/utils/storage.test.ts`
3. Run tests: `npm test`
4. Build: `npm run build`
5. Check coverage: `npm run test:coverage`

## License

MIT
