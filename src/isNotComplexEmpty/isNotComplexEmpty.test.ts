import { describe, expect, test } from 'vitest';

import isNotComplexEmpty from './isNotComplexEmpty';

describe('isNotComplexEmpty', () => {
  test('should return false for null and undefined', () => {
    expect(isNotComplexEmpty(null)).toBe(false);
    expect(isNotComplexEmpty(undefined)).toBe(false);
  });

  test('should return false for NaN', () => {
    expect(isNotComplexEmpty(NaN)).toBe(false);
  });

  test('should return false for empty string', () => {
    expect(isNotComplexEmpty('')).toBe(false);
  });

  test('should return true for non-empty string', () => {
    expect(isNotComplexEmpty('hello')).toBe(true);
    expect(isNotComplexEmpty(' ')).toBe(true);
  });

  test('should return false for empty array', () => {
    expect(isNotComplexEmpty([])).toBe(false);
  });

  test('should return true for non-empty array', () => {
    expect(isNotComplexEmpty([1])).toBe(true);
    expect(isNotComplexEmpty([null])).toBe(true);
  });

  test('should return false for empty object', () => {
    expect(isNotComplexEmpty({})).toBe(false);
  });

  test('should return true for non-empty object', () => {
    expect(isNotComplexEmpty({ a: 1 })).toBe(true);
    expect(isNotComplexEmpty({ a: null })).toBe(true);
  });

  test('should return true for Date objects', () => {
    expect(isNotComplexEmpty(new Date())).toBe(true);
  });

  test('should return true for numbers', () => {
    expect(isNotComplexEmpty(0)).toBe(true);
    expect(isNotComplexEmpty(1)).toBe(true);
    expect(isNotComplexEmpty(-1)).toBe(true);
  });

  test('should return true for boolean values', () => {
    expect(isNotComplexEmpty(true)).toBe(true);
    expect(isNotComplexEmpty(false)).toBe(true);
  });
});
