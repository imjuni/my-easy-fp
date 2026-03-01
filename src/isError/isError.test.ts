import { describe, expect, test } from 'vitest';

import isError from './isError';

describe('isError', () => {
  test('should return Error instance when input is Error', () => {
    const error = new Error('Test error');
    const result = isError(error);
    expect(result).toBe(error);
  });

  test('should return Error instance for different Error types', () => {
    const typeError = new TypeError('Type error');
    const rangeError = new RangeError('Range error');

    expect(isError(typeError)).toBe(typeError);
    expect(isError(rangeError)).toBe(rangeError);
  });

  test('should return error-like object with message and stack', () => {
    const errorLike = { message: 'Error message', stack: 'Error stack' };
    const result = isError(errorLike);
    expect(result).toBe(errorLike);
  });

  test('should return undefined for non-error values without default', () => {
    expect(isError('string')).toBeUndefined();
    expect(isError(123)).toBeUndefined();
    expect(isError(null)).toBeUndefined();
    expect(isError(undefined)).toBeUndefined();
    expect(isError({})).toBeUndefined();
  });

  test('should return default value when provided and input is not error', () => {
    const defaultError = new Error('Default error');

    expect(isError('string', defaultError)).toBe(defaultError);
    expect(isError(123, defaultError)).toBe(defaultError);
    expect(isError(null, defaultError)).toBe(defaultError);
  });

  test('should not return default value when input is valid error', () => {
    const error = new Error('Test error');
    const defaultError = new Error('Default error');

    expect(isError(error, defaultError)).toBe(error);
  });

  test('should handle objects with only message (no stack)', () => {
    const invalidError = { message: 'Error message' };
    expect(isError(invalidError)).toBeUndefined();
  });

  test('should handle objects with only stack (no message)', () => {
    const invalidError = { stack: 'Error stack' };
    expect(isError(invalidError)).toBeUndefined();
  });
});
