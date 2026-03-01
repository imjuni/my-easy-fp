import { describe, expect, test } from 'vitest';

import settify from './settify.ts';

describe('settify', () => {
  test('should remove duplicate numbers', () => {
    const input = [1, 2, 2, 3, 3, 3, 4];
    const result = settify(input);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  test('should remove duplicate strings', () => {
    const input = ['a', 'b', 'b', 'c', 'a'];
    const result = settify(input);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  test('should handle mixed types', () => {
    const input = [1, '1', 1, '1', 2];
    const result = settify(input);
    expect(result).toEqual([1, '1', 2]);
  });

  test('should handle empty array', () => {
    const result = settify([]);
    expect(result).toEqual([]);
  });

  test('should handle array with no duplicates', () => {
    const input = [1, 2, 3, 4];
    const result = settify(input);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  test('should handle array with all same elements', () => {
    const input = [5, 5, 5, 5];
    const result = settify(input);
    expect(result).toEqual([5]);
  });

  test('should preserve insertion order', () => {
    const input = [3, 1, 4, 1, 5, 9, 2, 6, 5];
    const result = settify(input);
    expect(result).toEqual([3, 1, 4, 5, 9, 2, 6]);
  });

  test('should handle objects by reference', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 1 }; // different object with same content

    const input = [obj1, obj2, obj1, obj3];
    const result = settify(input);
    expect(result).toEqual([obj1, obj2, obj3]);
    expect(result).toHaveLength(3);
  });

  test('should handle boolean values', () => {
    const input = [true, false, true, false, true];
    const result = settify(input);
    expect(result).toEqual([true, false]);
  });

  test('should handle null and undefined', () => {
    const input = [null, undefined, null, undefined, 1];
    const result = settify(input);
    expect(result).toEqual([null, undefined, 1]);
  });

  test('should return a new array', () => {
    const input = [1, 2, 3];
    const result = settify(input);
    expect(result).not.toBe(input);
    expect(result).toEqual([1, 2, 3]);
  });
});
