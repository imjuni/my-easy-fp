import { describe, expect, test } from 'vitest';

import isUndefined from './isUndefined.ts';

describe('isUndefined', () => {
  test('should return true for undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  test('should return false for null', () => {
    expect(isUndefined(null)).toBe(false);
  });

  test('should return false for all non-undefined values', () => {
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined('')).toBe(false);
    expect(isUndefined(NaN)).toBe(false);
    expect(isUndefined(1)).toBe(false);
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined('hello')).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined({})).toBe(false);
  });

  test('should work with function return values', () => {
    const getValue = (n: number) => (n > 0 ? n : undefined);
    expect(isUndefined(getValue(1))).toBe(false);
    expect(isUndefined(getValue(-1))).toBe(true);
  });

  test('should work with optional object properties', () => {
    const obj: { prop?: string } = {};
    expect(isUndefined(obj.prop)).toBe(true);

    obj.prop = 'value';
    expect(isUndefined(obj.prop)).toBe(false);
  });
});
