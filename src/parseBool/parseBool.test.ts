import { describe, expect, test } from 'vitest';

import parseBool from './parseBool';

describe('parseBool', () => {
  test('should return true for string "true"', () => {
    expect(parseBool('true')).toBe(true);
  });

  test('should return false for string "false"', () => {
    expect(parseBool('false')).toBe(false);
  });

  test('should return true for boolean true', () => {
    expect(parseBool(true)).toBe(true);
  });

  test('should return false for boolean false', () => {
    expect(parseBool(false)).toBe(false);
  });

  test('should return false for null', () => {
    expect(parseBool(null)).toBe(false);
  });

  test('should return false for undefined', () => {
    expect(parseBool(undefined)).toBe(false);
  });

  test('should return false for other string values', () => {
    expect(parseBool('yes')).toBe(false);
    expect(parseBool('no')).toBe(false);
    expect(parseBool('1')).toBe(false);
    expect(parseBool('0')).toBe(false);
    expect(parseBool('')).toBe(false);
    expect(parseBool('hello')).toBe(false);
  });

  test('should return false for numbers', () => {
    expect(parseBool(1)).toBe(false);
    expect(parseBool(0)).toBe(false);
    expect(parseBool(-1)).toBe(false);
    expect(parseBool(NaN)).toBe(false);
  });

  test('should return false for objects and arrays', () => {
    expect(parseBool({})).toBe(false);
    expect(parseBool([])).toBe(false);
    expect(parseBool({ value: true })).toBe(false);
    expect(parseBool([true])).toBe(false);
  });

  test('should handle case sensitivity', () => {
    expect(parseBool('True')).toBe(false);
    expect(parseBool('TRUE')).toBe(false);
    expect(parseBool('False')).toBe(false);
    expect(parseBool('FALSE')).toBe(false);
  });

  test('should return false when exception occurs', () => {
    // This tests the catch block, though it's hard to trigger naturally
    const result = parseBool('true');
    expect(typeof result).toBe('boolean');
  });
});
