import { describe, expect, test } from 'vitest';

import atOrUndefined from './atOrUndefined';

const arr = [1, 2, 3, 4, 5, 6, 7];

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
