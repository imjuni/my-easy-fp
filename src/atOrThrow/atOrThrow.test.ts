import { describe, expect, test } from '@jest/globals';
import atOrThrow from './atOrThrow';

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
