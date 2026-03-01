import { describe, expect, test } from 'vitest';

import invert from './invert';

describe('invert', () => {
  test('should invert true to false', () => {
    expect(invert(true)).toBe(false);
  });

  test('should invert false to true', () => {
    expect(invert(false)).toBe(true);
  });

  test('should invert truthy values to false', () => {
    expect(invert(1)).toBe(false);
    expect(invert('hello')).toBe(false);
    expect(invert([])).toBe(false);
    expect(invert({})).toBe(false);
    expect(invert(42)).toBe(false);
  });

  test('should invert falsy values to true', () => {
    expect(invert(0)).toBe(true);
    expect(invert('')).toBe(true);
    expect(invert(null)).toBe(true);
    expect(invert(undefined)).toBe(true);
    expect(invert(NaN)).toBe(true);
  });

  test('should work with function return values', () => {
    const isEven = (n: number) => n % 2 === 0;
    expect(invert(isEven(2))).toBe(false);
    expect(invert(isEven(3))).toBe(true);
  });
});
