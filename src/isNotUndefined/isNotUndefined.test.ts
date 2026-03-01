import { describe, expect, test } from 'vitest';

import isNotUndefined from './isNotUndefined.ts';

describe('isNotUndefined', () => {
  test('should return false for undefined', () => {
    expect(isNotUndefined(undefined)).toBe(false);
  });

  test('should return true for null', () => {
    expect(isNotUndefined(null)).toBe(true);
  });

  test('should return true for all non-undefined values', () => {
    expect(isNotUndefined(0)).toBe(true);
    expect(isNotUndefined(false)).toBe(true);
    expect(isNotUndefined('')).toBe(true);
    expect(isNotUndefined(NaN)).toBe(true);
    expect(isNotUndefined(1)).toBe(true);
    expect(isNotUndefined(true)).toBe(true);
    expect(isNotUndefined('hello')).toBe(true);
    expect(isNotUndefined([])).toBe(true);
    expect(isNotUndefined({})).toBe(true);
  });

  test('should work with function return values', () => {
    const getValue = (n: number) => (n > 0 ? n : undefined);
    expect(isNotUndefined(getValue(1))).toBe(true);
    expect(isNotUndefined(getValue(-1))).toBe(false);
  });
});
