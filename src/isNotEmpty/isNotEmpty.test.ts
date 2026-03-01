import { describe, expect, test } from 'vitest';

import isNotEmpty from './isNotEmpty.ts';

describe('isNotEmpty', () => {
  test('should return false for null', () => {
    expect(isNotEmpty(null)).toBe(false);
  });

  test('should return false for undefined', () => {
    expect(isNotEmpty(undefined)).toBe(false);
  });

  test('should return true for falsy but not null/undefined values', () => {
    expect(isNotEmpty(false)).toBe(true);
    expect(isNotEmpty(0)).toBe(true);
    expect(isNotEmpty('')).toBe(true);
    expect(isNotEmpty(NaN)).toBe(true);
  });

  test('should return true for truthy values', () => {
    expect(isNotEmpty(true)).toBe(true);
    expect(isNotEmpty(1)).toBe(true);
    expect(isNotEmpty('hello')).toBe(true);
    expect(isNotEmpty([])).toBe(true);
    expect(isNotEmpty({})).toBe(true);
  });

  test('should work with function return values', () => {
    const getValue = (n: number) => (n > 0 ? n : null);
    expect(isNotEmpty(getValue(1))).toBe(true);
    expect(isNotEmpty(getValue(-1))).toBe(false);
  });
});
