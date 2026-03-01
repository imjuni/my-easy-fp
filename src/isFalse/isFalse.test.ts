import { describe, expect, test } from 'vitest';

import isFalse from './isFalse.ts';

describe('isFalse', () => {
  test('should return true for false', () => {
    expect(isFalse(false)).toBe(true);
  });

  test('should return false for true', () => {
    expect(isFalse(true)).toBe(false);
  });

  test('should return true for falsy values', () => {
    expect(isFalse(0)).toBe(true);
    expect(isFalse('')).toBe(true);
    expect(isFalse(null)).toBe(true);
    expect(isFalse(undefined)).toBe(true);
    expect(isFalse(NaN)).toBe(true);
  });

  test('should return false for truthy values', () => {
    expect(isFalse(1)).toBe(false);
    expect(isFalse('hello')).toBe(false);
    expect(isFalse([])).toBe(false);
    expect(isFalse({})).toBe(false);
    expect(isFalse(42)).toBe(false);
  });

  test('should work with comparison results', () => {
    expect(isFalse(5 > 10)).toBe(true);
    expect(isFalse(5 < 10)).toBe(false);
  });
});
