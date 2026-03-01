import { describe, expect, test } from 'vitest';

import findOrThrow from './findOrThrow';

describe('findOrThrow', () => {
  test('should find element that matches predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = findOrThrow(arr, (x) => x > 3);
    expect(result).toBe(4);
  });

  test('should find first matching element', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = findOrThrow(arr, (x) => x > 2);
    expect(result).toBe(3);
  });

  test('should throw error when no element matches', () => {
    const arr = [1, 2, 3];
    expect(() => findOrThrow(arr, (x) => x > 5)).toThrow('findOrThrow got undefined result');
  });

  test('should throw custom error when provided', () => {
    const arr = [1, 2, 3];
    const customError = new Error('Custom not found error');
    expect(() => findOrThrow(arr, (x) => x > 5, customError)).toThrow('Custom not found error');
  });

  test('should work with object arrays', () => {
    const arr = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const result = findOrThrow(arr, (item) => item.name === 'Bob');
    expect(result).toEqual({ id: 2, name: 'Bob' });
  });

  test('should throw when searching empty array', () => {
    expect(() => findOrThrow([], (x) => x === 1)).toThrow('findOrThrow got undefined result');
  });
});
