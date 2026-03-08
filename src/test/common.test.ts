import { describe, it, expect } from 'vitest';
import {
  chunkArray,
  removeDuplicates,
  sortBy,
  isEmpty,
  generateUUID,
} from '@utils/common';

describe('Common Utilities', () => {
  describe('chunkArray', () => {
    it('chunks array correctly', () => {
      const array = [1, 2, 3, 4, 5];
      const result = chunkArray(array, 2);
      expect(result).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('handles empty array', () => {
      const result = chunkArray([], 2);
      expect(result).toEqual([]);
    });
  });

  describe('removeDuplicates', () => {
    it('removes duplicates from array', () => {
      const array = [1, 2, 2, 3, 3, 3];
      const result = removeDuplicates(array);
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('sortBy', () => {
    it('sorts array of objects', () => {
      const data = [
        { name: 'Charlie', age: 30 },
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 28 },
      ];

      const result = sortBy(data, 'name');
      expect(result[0].name).toBe('Alice');
      expect(result[1].name).toBe('Bob');
      expect(result[2].name).toBe('Charlie');
    });

    it('sorts in descending order', () => {
      const data = [{ value: 1 }, { value: 3 }, { value: 2 }];
      const result = sortBy(data, 'value', 'desc');
      expect(result[0].value).toBe(3);
      expect(result[1].value).toBe(2);
      expect(result[2].value).toBe(1);
    });
  });

  describe('isEmpty', () => {
    it('identifies empty values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    it('identifies non-empty values', () => {
      expect(isEmpty('text')).toBe(false);
      expect(isEmpty([1, 2])).toBe(false);
      expect(isEmpty({ key: 'value' })).toBe(false);
    });
  });

  describe('generateUUID', () => {
    it('generates valid UUIDs', () => {
      const uuid = generateUUID();
      const uuidRegex = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;
      expect(uuidRegex.test(uuid)).toBe(true);
    });

    it('generates unique UUIDs', () => {
      const uuid1 = generateUUID();
      const uuid2 = generateUUID();
      expect(uuid1).not.toBe(uuid2);
    });
  });
});
