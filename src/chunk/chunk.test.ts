import { describe, expect, test } from 'vitest';

import chunk from './chunk.ts';

describe('chunk', () => {
  test('should chunk array into smaller arrays', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = chunk(arr, 3);
    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });

  test('should handle array that does not divide evenly', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = chunk(arr, 2);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  test('should handle empty array', () => {
    const result = chunk([], 3);
    expect(result).toEqual([]);
  });

  test('should handle chunk size larger than array', () => {
    const arr = [1, 2];
    const result = chunk(arr, 5);
    expect(result).toEqual([[1, 2]]);
  });

  test('should handle chunk size of 1', () => {
    const arr = [1, 2, 3];
    const result = chunk(arr, 1);
    expect(result).toEqual([[1], [2], [3]]);
  });
});
