import { describe, expect, test } from 'vitest';

import first from './first.ts';

describe('first', () => {
  test('should return first element of array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = first(arr);
    expect(result).toBe(1);
  });

  test('should return the value if not an array', () => {
    const value = 'hello';
    const result = first(value);
    expect(result).toBe('hello');
  });

  test('should throw error when array is empty', () => {
    expect(() => first([])).toThrow('invalid first index');
  });

  test('should throw error when first element is null', () => {
    expect(() => first([null, 2, 3])).toThrow('invalid first index');
  });

  test('should throw error when first element is undefined', () => {
    expect(() => first([undefined, 2, 3])).toThrow('invalid first index');
  });

  test('should work with string arrays', () => {
    const arr = ['a', 'b', 'c'];
    const result = first(arr);
    expect(result).toBe('a');
  });

  test('should work with object arrays', () => {
    const arr = [{ id: 1 }, { id: 2 }];
    const result = first(arr);
    expect(result).toEqual({ id: 1 });
  });
});
