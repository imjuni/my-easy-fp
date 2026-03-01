import { describe, expect, test } from 'vitest';

import keyBys from './keyBys.ts';

describe('keyBys', () => {
  test('should group array items by key into arrays', () => {
    const users = [
      { id: 1, name: 'Alice', department: 'Engineering' },
      { id: 2, name: 'Bob', department: 'Engineering' },
      { id: 3, name: 'Charlie', department: 'Marketing' },
    ];

    const result = keyBys(users, 'department');

    expect(result).toEqual({
      Engineering: [
        { id: 1, name: 'Alice', department: 'Engineering' },
        { id: 2, name: 'Bob', department: 'Engineering' },
      ],
      Marketing: [{ id: 3, name: 'Charlie', department: 'Marketing' }],
    });
  });

  test('should handle single items per key', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];

    const result = keyBys(users, 'name');

    expect(result).toEqual({
      Alice: [{ id: 1, name: 'Alice' }],
      Bob: [{ id: 2, name: 'Bob' }],
    });
  });

  test('should accumulate multiple items with same key', () => {
    const orders = [
      { id: 1, status: 'pending', amount: 100 },
      { id: 2, status: 'completed', amount: 200 },
      { id: 3, status: 'pending', amount: 150 },
      { id: 4, status: 'completed', amount: 300 },
    ];

    const result = keyBys(orders, 'status');

    expect(result).toEqual({
      pending: [
        { id: 1, status: 'pending', amount: 100 },
        { id: 3, status: 'pending', amount: 150 },
      ],
      completed: [
        { id: 2, status: 'completed', amount: 200 },
        { id: 4, status: 'completed', amount: 300 },
      ],
    });
  });

  test('should handle empty array', () => {
    const result = keyBys([], 'id');
    expect(result).toEqual({});
  });

  test('should work with different data types as keys', () => {
    const items = [
      { value: true, label: 'Yes' },
      { value: true, label: 'Correct' },
      { value: false, label: 'No' },
    ];

    const result = keyBys(items, 'value');

    expect(result).toEqual({
      true: [
        { value: true, label: 'Yes' },
        { value: true, label: 'Correct' },
      ],
      false: [{ value: false, label: 'No' }],
    });
  });

  test('should preserve insertion order within groups', () => {
    const items = [
      { category: 'A', order: 3 },
      { category: 'B', order: 1 },
      { category: 'A', order: 2 },
      { category: 'B', order: 4 },
    ];

    const result = keyBys(items, 'category');

    expect(result.A).toEqual([
      { category: 'A', order: 3 },
      { category: 'A', order: 2 },
    ]);
    expect(result.B).toEqual([
      { category: 'B', order: 1 },
      { category: 'B', order: 4 },
    ]);
  });
});
