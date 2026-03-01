import { describe, expect, test } from 'vitest';

import last from './last.ts';

describe('last', () => {
  test('should return last element of array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = last(arr);
    expect(result).toBe(5);
  });

  test('should work with string arrays', () => {
    const arr = ['a', 'b', 'c'];
    const result = last(arr);
    expect(result).toBe('c');
  });

  test('should work with object arrays', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = last(arr);
    expect(result).toEqual({ id: 3 });
  });

  test('should throw error when array is empty', () => {
    expect(() => last([])).toThrow('invalid last index');
  });

  test('should throw error when last element is null', () => {
    expect(() => last([1, 2, null])).toThrow('invalid last index');
  });

  test('should throw error when last element is undefined', () => {
    expect(() => last([1, 2, undefined])).toThrow('invalid last index');
  });

  test('should throw custom error when provided', () => {
    const customError = new Error('Custom last error');
    expect(() => last([], customError)).toThrow('Custom last error');
  });

  test('should work with single element array', () => {
    const arr = [42];
    const result = last(arr);
    expect(result).toBe(42);
  });

  test('should work with boolean values', () => {
    const arr = [true, false, true];
    const result = last(arr);
    expect(result).toBe(true);
  });

  test('should work with zero as last element', () => {
    const arr = [1, 2, 0];
    const result = last(arr);
    expect(result).toBe(0);
  });
});
