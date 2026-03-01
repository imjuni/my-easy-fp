import { describe, expect, test } from 'vitest';

import orThrow from './orThrow';

describe('orThrow', () => {
  test('should return value when it is not null or undefined', () => {
    expect(orThrow('hello')).toBe('hello');
    expect(orThrow(42)).toBe(42);
    expect(orThrow(true)).toBe(true);
    expect(orThrow(false)).toBe(false);
    expect(orThrow(0)).toBe(0);
    expect(orThrow('')).toBe('');
  });

  test('should return objects and arrays', () => {
    const obj = { id: 1, name: 'test' };
    const arr = [1, 2, 3];

    expect(orThrow(obj)).toBe(obj);
    expect(orThrow(arr)).toBe(arr);
  });

  test('should throw error for null', () => {
    expect(() => orThrow(null)).toThrow('invalid value');
  });

  test('should throw error for undefined', () => {
    expect(() => orThrow(undefined)).toThrow('invalid value');
  });

  test('should throw custom error when provided', () => {
    const customError = new Error('Custom null error');
    expect(() => orThrow(null, customError)).toThrow('Custom null error');

    const customError2 = new Error('Custom undefined error');
    expect(() => orThrow(undefined, customError2)).toThrow('Custom undefined error');
  });

  test('should work with function return values', () => {
    const getValue = (shouldReturnNull: boolean) => (shouldReturnNull ? null : 'value');

    expect(orThrow(getValue(false))).toBe('value');
    expect(() => orThrow(getValue(true))).toThrow('invalid value');
  });

  test('should work with nullable types', () => {
    const nullableString: string | null = 'test';
    const nullValue: string | null = null;

    expect(orThrow(nullableString)).toBe('test');
    expect(() => orThrow(nullValue)).toThrow('invalid value');
  });

  test('should preserve type of returned value', () => {
    const num = orThrow(123);
    const str = orThrow('hello');
    const bool = orThrow(true);

    expect(typeof num).toBe('number');
    expect(typeof str).toBe('string');
    expect(typeof bool).toBe('boolean');
  });
});
