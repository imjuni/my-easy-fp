import { describe, expect, test } from 'vitest';

import populate from './populate';

describe('populate', () => {
  test('should create array with zero-based indexing by default', () => {
    const result = populate(5);
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  test('should create array with one-based indexing when oneBase is true', () => {
    const result = populate(5, true);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test('should create array with one-based indexing when oneBase is any truthy value', () => {
    const result = populate(3, 1);
    expect(result).toEqual([1, 2, 3]);
  });

  test('should handle size of 0', () => {
    expect(populate(0)).toEqual([]);
    expect(populate(0, true)).toEqual([]);
  });

  test('should handle size of 1', () => {
    expect(populate(1)).toEqual([0]);
    expect(populate(1, true)).toEqual([1]);
  });

  test('should handle large sizes', () => {
    const result = populate(100);
    expect(result).toHaveLength(100);
    expect(result[0]).toBe(0);
    expect(result[99]).toBe(99);

    const resultOneBased = populate(100, true);
    expect(resultOneBased).toHaveLength(100);
    expect(resultOneBased[0]).toBe(1);
    expect(resultOneBased[99]).toBe(100);
  });

  test('should use zero-based when oneBase is null or undefined', () => {
    // Note: implementation only checks for null/undefined, not all falsy values
    expect(populate(3, null)).toEqual([0, 1, 2]);
    expect(populate(3, undefined)).toEqual([0, 1, 2]);
  });

  test('should use one-based when oneBase is any non-null value', () => {
    // Implementation treats any non-null/undefined value as truthy
    expect(populate(3, false)).toEqual([1, 2, 3]);
    expect(populate(3, 0)).toEqual([1, 2, 3]);
    expect(populate(3, '')).toEqual([1, 2, 3]);
  });

  test('should create consecutive numbers', () => {
    const result = populate(10);
    // eslint-disable-next-line no-restricted-syntax
    for (let i = 0; i < result.length - 1; i += 1) {
      expect(result[i + 1] - result[i]).toBe(1);
    }
  });
});
