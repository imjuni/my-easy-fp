import { describe, expect, test } from 'vitest';

import typedkey from './typedkey';

describe('typedkey', () => {
  test('should return keys of simple object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = typedkey(obj);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  test('should return keys in the same order as Object.keys', () => {
    const obj = { name: 'John', age: 30, city: 'New York' };
    const result = typedkey(obj);
    const expected = Object.keys(obj);
    expect(result).toEqual(expected);
  });

  test('should handle empty object', () => {
    const obj = {};
    const result = typedkey(obj);
    expect(result).toEqual([]);
  });

  test('should handle object with different value types', () => {
    const obj = {
      string: 'hello',
      number: 42,
      boolean: true,
      array: [1, 2, 3],
      object: { nested: 'value' },
      nullValue: null,
      undefinedValue: undefined,
    };

    const result = typedkey(obj);
    expect(result).toEqual([
      'string',
      'number',
      'boolean',
      'array',
      'object',
      'nullValue',
      'undefinedValue',
    ]);
  });

  test('should not include inherited properties', () => {
    const parent = { inherited: 'value' };
    const child = Object.create(parent);
    child.own = 'ownValue';

    const result = typedkey(child);
    expect(result).toEqual(['own']);
    expect(result).not.toContain('inherited');
  });

  test('should handle object with symbol keys (but not return them)', () => {
    const sym = Symbol('test');
    const obj = {
      string: 'value',
      [sym]: 'symbolValue',
    };

    const result = typedkey(obj);
    expect(result).toEqual(['string']);
  });

  test('should handle object with numeric string keys', () => {
    const obj = { '0': 'zero', '1': 'one', '10': 'ten' };
    const result = typedkey(obj);
    expect(result).toEqual(['0', '1', '10']);
  });

  test('should work with arrays (return indices)', () => {
    const arr = ['a', 'b', 'c'];
    const result = typedkey(arr);
    expect(result).toEqual(['0', '1', '2']);
  });

  test('should handle objects with function values', () => {
    const obj = {
      prop: 'value',
      method() {
        return 'test';
      },
      arrow: () => 'arrow',
    };

    const result = typedkey(obj);
    expect(result).toEqual(['prop', 'method', 'arrow']);
  });

  test('should preserve key order for mixed key types', () => {
    const obj: Record<string | number, unknown> = {};
    obj.b = 1;
    obj[1] = 2;
    obj.a = 3;
    obj[0] = 4;

    const result = typedkey(obj);
    const expected = Object.keys(obj);
    expect(result).toEqual(expected);
  });
});
