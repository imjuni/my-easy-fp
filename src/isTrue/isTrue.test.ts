import { describe, expect, test } from 'vitest';

import isTrue from './isTrue';

describe('isTrue', () => {
  test('should return true for true', () => {
    expect(isTrue(true)).toBe(true);
  });

  test('should return false for false', () => {
    expect(isTrue(false)).toBe(false);
  });

  test('should return truthy values as-is', () => {
    expect(isTrue(1)).toBe(1);
    expect(isTrue('hello')).toBe('hello');
    expect(isTrue([])).toEqual([]);
    expect(isTrue({})).toEqual({});
    expect(isTrue(42)).toBe(42);
  });

  test('should return falsy values as-is', () => {
    expect(isTrue(0)).toBe(0);
    expect(isTrue('')).toBe('');
    expect(isTrue(null)).toBe(null);
    expect(isTrue(undefined)).toBe(undefined);
    expect(isTrue(NaN)).toBe(NaN);
  });

  test('should work with comparison results', () => {
    expect(isTrue(5 > 3)).toBe(true);
    expect(isTrue(5 < 3)).toBe(false);
  });

  test('should pass through any value unchanged', () => {
    const obj = { test: 'value' };
    expect(isTrue(obj)).toBe(obj);

    const arr = [1, 2, 3];
    expect(isTrue(arr)).toBe(arr);
  });
});
