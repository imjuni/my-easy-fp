import { describe, expect, test } from 'vitest';

import isEmpty from './isEmpty.ts';

describe('isEmpty', () => {
  test('should return true for null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  test('should return true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  test('should return false for falsy but not null/undefined values', () => {
    expect(isEmpty(false)).toBe(false);
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty('')).toBe(false);
    expect(isEmpty(NaN)).toBe(false);
  });

  test('should return false for truthy values', () => {
    expect(isEmpty(true)).toBe(false);
    expect(isEmpty(1)).toBe(false);
    expect(isEmpty('hello')).toBe(false);
    expect(isEmpty([])).toBe(false);
    expect(isEmpty({})).toBe(false);
  });

  test('should work with function return values', () => {
    const getValue = (n: number) => (n > 0 ? n : null);
    expect(isEmpty(getValue(1))).toBe(false);
    expect(isEmpty(getValue(-1))).toBe(true);
  });
});
