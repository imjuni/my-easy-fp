import { describe, expect, test } from 'vitest';

import toArray from './toArray';

describe('toArray', () => {
  test('should return array as-is when input is already an array', () => {
    const input = [1, 2, 3];
    const result = toArray(input);
    expect(result).toBe(input);
    expect(result).toEqual([1, 2, 3]);
  });

  test('should wrap non-array values in an array', () => {
    expect(toArray(5)).toEqual([5]);
    expect(toArray('hello')).toEqual(['hello']);
    expect(toArray(true)).toEqual([true]);
    expect(toArray(false)).toEqual([false]);
  });

  test('should handle null and undefined', () => {
    expect(toArray(null)).toEqual([null]);
    expect(toArray(undefined)).toEqual([undefined]);
  });

  test('should handle objects', () => {
    const obj = { id: 1, name: 'test' };
    const result = toArray(obj);
    expect(result).toEqual([obj]);
    expect(result[0]).toBe(obj);
  });

  test('should handle functions', () => {
    const func = () => 'test';
    const result = toArray(func);
    expect(result).toEqual([func]);
    expect(result[0]).toBe(func);
  });

  test('should handle zero', () => {
    expect(toArray(0)).toEqual([0]);
  });

  test('should handle empty string', () => {
    expect(toArray('')).toEqual(['']);
  });

  test('should handle NaN', () => {
    expect(toArray(NaN)).toEqual([NaN]);
  });

  test('should handle Date objects', () => {
    const date = new Date();
    const result = toArray(date);
    expect(result).toEqual([date]);
    expect(result[0]).toBe(date);
  });

  test('should handle nested arrays', () => {
    const nestedArray = [
      [1, 2],
      [3, 4],
    ];
    const result = toArray(nestedArray);
    expect(result).toBe(nestedArray);
    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  test('should handle empty arrays', () => {
    const emptyArray: unknown[] = [];
    const result = toArray(emptyArray);
    expect(result).toBe(emptyArray);
    expect(result).toEqual([]);
  });

  test('should preserve array with mixed types', () => {
    const mixedArray = [1, 'hello', true, null, { id: 1 }];
    const result = toArray(mixedArray);
    expect(result).toBe(mixedArray);
    expect(result).toEqual([1, 'hello', true, null, { id: 1 }]);
  });
});
