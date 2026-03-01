import { describe, expect, test } from 'vitest';

import isNull from './isNull.ts';

describe('isNull', () => {
  test('should return true for null', () => {
    expect(isNull(null)).toBe(true);
  });

  test('should return false for undefined', () => {
    expect(isNull(undefined)).toBe(false);
  });

  test('should return false for all non-null values', () => {
    expect(isNull(0)).toBe(false);
    expect(isNull(false)).toBe(false);
    expect(isNull('')).toBe(false);
    expect(isNull(NaN)).toBe(false);
    expect(isNull(1)).toBe(false);
    expect(isNull(true)).toBe(false);
    expect(isNull('hello')).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull({})).toBe(false);
  });

  test('should work with function return values', () => {
    const getValue = (n: number) => (n > 0 ? n : null);
    expect(isNull(getValue(1))).toBe(false);
    expect(isNull(getValue(-1))).toBe(true);
  });
});
