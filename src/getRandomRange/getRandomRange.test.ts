/* eslint-disable no-restricted-syntax, no-plusplus */
import { describe, expect, test } from 'vitest';

import getRandomRange from './getRandomRange.ts';

describe('getRandomRange', () => {
  test('should return number within range', () => {
    const min = 10;
    const max = 20;
    for (let i = 0; i < 100; i++) {
      const result = getRandomRange(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThan(max);
    }
  });

  test('should work with negative numbers', () => {
    const min = -10;
    const max = -5;
    for (let i = 0; i < 100; i++) {
      const result = getRandomRange(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThan(max);
    }
  });

  test('should work with decimal numbers', () => {
    const min = 1.5;
    const max = 2.5;
    for (let i = 0; i < 100; i++) {
      const result = getRandomRange(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThan(max);
    }
  });

  test('should work when min equals max', () => {
    const min = 5;
    const max = 5;
    const result = getRandomRange(min, max);
    expect(result).toBe(5);
  });

  test('should return different values on multiple calls', () => {
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(getRandomRange(0, 100));
    }
    // Should have multiple different values (not guaranteed but very likely)
    expect(results.size).toBeGreaterThan(50);
  });
});
