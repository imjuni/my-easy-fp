import { describe, expect, test } from '@jest/globals';
import atOrUndefined from '../atOrUndefined/atOrUndefined';
import atOrThrow from '../atOrThrow/atOrThrow';

const arr = [1, 2, 3, 4, 5, 6, 7];

describe('atOrThrow', () => {
  test('pass - positive', () => {
    const r = atOrThrow(arr, 0);
    expect(r).toEqual(1);
  });

  test('pass - negative', () => {
    const r = atOrThrow(arr, -2);
    expect(r).toEqual(6);
  });

  test('pass - not array', () => {
    const r = atOrThrow(3, 1);
    expect(r).toEqual(3);
  });

  test('exception - null', () => {
    expect(() => atOrThrow(null, -2)).toThrow();
  });

  test('exception - over length', () => {
    expect(() => atOrThrow(arr, 10)).toThrow();
  });

  test('exception - null element', () => {
    expect(() => atOrThrow([1, 2, null, 3], 2)).toThrow();
  });

  test('exception - null + custom error', () => {
    expect(() => atOrThrow(null, -2, new Error('raise'))).toThrow();
  });

  test('exception - over length + custom error', () => {
    expect(() => atOrThrow(arr, 10, new Error('raise'))).toThrow();
  });

  test('exception - null element + custom error', () => {
    expect(() => atOrThrow([1, 2, null, 3], 2, new Error('raise'))).toThrow();
  });
});

describe('atOrUndefined', () => {
  test('pass - positive', () => {
    const r = atOrUndefined(arr, 0);
    expect(r).toEqual(1);
  });

  test('pass - negative', () => {
    const r = atOrUndefined(arr, -2);
    expect(r).toEqual(6);
  });

  test('pass - not array', () => {
    const r = atOrUndefined(3, 1);
    expect(r).toEqual(3);
  });

  test('undefined - null', () => {
    expect(atOrUndefined(null, -2)).toBeUndefined();
  });

  test('exception - over length', () => {
    expect(atOrUndefined(arr, 10)).toBeUndefined();
  });

  test('exception - null element', () => {
    expect(atOrUndefined([1, 2, null, 3], 2)).toBeUndefined();
  });
});
