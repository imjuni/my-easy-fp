import { describe, expect, test } from 'vitest';

import isNotNull from './isNotNull';

describe('isNotNull', () => {
  test('should return false for null', () => {
    expect(isNotNull(null)).toBe(false);
  });

  test('should return true for undefined', () => {
    expect(isNotNull(undefined)).toBe(true);
  });

  test('should return true for all non-null values', () => {
    expect(isNotNull(0)).toBe(true);
    expect(isNotNull(false)).toBe(true);
    expect(isNotNull('')).toBe(true);
    expect(isNotNull(NaN)).toBe(true);
    expect(isNotNull(1)).toBe(true);
    expect(isNotNull(true)).toBe(true);
    expect(isNotNull('hello')).toBe(true);
    expect(isNotNull([])).toBe(true);
    expect(isNotNull({})).toBe(true);
  });

  test('should work with function return values', () => {
    const getValue = (n: number) => (n > 0 ? n : null);
    expect(isNotNull(getValue(1))).toBe(true);
    expect(isNotNull(getValue(-1))).toBe(false);
  });
});
