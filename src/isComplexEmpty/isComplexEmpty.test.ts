import { describe, expect, test } from 'vitest';

import isComplexEmpty from './isComplexEmpty.ts';

describe('isComplexEmpty', () => {
  test('should return true for null and undefined', () => {
    expect(isComplexEmpty(null)).toBe(true);
    expect(isComplexEmpty(undefined)).toBe(true);
  });

  test('should return true for NaN', () => {
    expect(isComplexEmpty(NaN)).toBe(true);
  });

  test('should return true for empty string', () => {
    expect(isComplexEmpty('')).toBe(true);
  });

  test('should return false for non-empty string', () => {
    expect(isComplexEmpty('hello')).toBe(false);
    expect(isComplexEmpty(' ')).toBe(false);
  });

  test('should return true for empty array', () => {
    expect(isComplexEmpty([])).toBe(true);
  });

  test('should return false for non-empty array', () => {
    expect(isComplexEmpty([1])).toBe(false);
    expect(isComplexEmpty([null])).toBe(false);
  });

  test('should return true for empty object', () => {
    expect(isComplexEmpty({})).toBe(true);
  });

  test('should return false for non-empty object', () => {
    expect(isComplexEmpty({ a: 1 })).toBe(false);
    expect(isComplexEmpty({ a: null })).toBe(false);
  });

  test('should return false for Date objects', () => {
    expect(isComplexEmpty(new Date())).toBe(false);
  });

  test('should return false for numbers', () => {
    expect(isComplexEmpty(0)).toBe(false);
    expect(isComplexEmpty(1)).toBe(false);
    expect(isComplexEmpty(-1)).toBe(false);
  });

  test('should return false for boolean values', () => {
    expect(isComplexEmpty(true)).toBe(false);
    expect(isComplexEmpty(false)).toBe(false);
  });
});
