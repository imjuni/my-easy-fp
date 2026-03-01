import { describe, expect, test } from 'vitest';

import keyBy from './keyBy.ts';

describe('keyBy', () => {
  test('should group array items by key', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];

    const result = keyBy(users, 'id');

    expect(result).toEqual({
      1: { id: 1, name: 'Alice' },
      2: { id: 2, name: 'Bob' },
      3: { id: 3, name: 'Charlie' },
    });
  });

  test('should handle string keys', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];

    const result = keyBy(users, 'name');

    expect(result).toEqual({
      Alice: { id: 1, name: 'Alice' },
      Bob: { id: 2, name: 'Bob' },
    });
  });

  test('should overwrite duplicate keys with last occurrence', () => {
    const users = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Alice', age: 30 },
    ];

    const result = keyBy(users, 'name');

    expect(result).toEqual({
      Alice: { id: 2, name: 'Alice', age: 30 },
    });
  });

  test('should handle empty array', () => {
    const result = keyBy([], 'id');
    expect(result).toEqual({});
  });

  test('should work with different data types as keys', () => {
    const items = [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ];

    const result = keyBy(items, 'value');

    expect(result).toEqual({
      true: { value: true, label: 'Yes' },
      false: { value: false, label: 'No' },
    });
  });

  test('should work with nested object values', () => {
    const items = [
      { id: 1, data: { category: 'A' } },
      { id: 2, data: { category: 'B' } },
    ];

    const result = keyBy(items, 'id');

    expect(result).toEqual({
      1: { id: 1, data: { category: 'A' } },
      2: { id: 2, data: { category: 'B' } },
    });
  });
});
