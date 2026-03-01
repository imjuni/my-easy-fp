import { describe, expect, test } from 'vitest';

import sleep from './sleep';

describe('sleep', () => {
  test('should resolve after default 1000ms', async () => {
    const start = Date.now();
    await sleep();
    const end = Date.now();
    const elapsed = end - start;

    // Allow some tolerance for timing
    expect(elapsed).toBeGreaterThanOrEqual(950);
    expect(elapsed).toBeLessThan(1050);
  });

  test('should resolve after specified milliseconds', async () => {
    const start = Date.now();
    await sleep(500);
    const end = Date.now();
    const elapsed = end - start;

    expect(elapsed).toBeGreaterThanOrEqual(450);
    expect(elapsed).toBeLessThan(550);
  });

  test('should resolve with undefined', async () => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const result = await sleep(100);
    expect(result).toBeUndefined();
  });

  test('should work with very short durations', async () => {
    const start = Date.now();
    await sleep(1);
    const end = Date.now();
    const elapsed = end - start;

    expect(elapsed).toBeGreaterThanOrEqual(0);
  });

  test('should work with zero duration', async () => {
    const start = Date.now();
    await sleep(0);
    const end = Date.now();

    // Should resolve almost immediately
    expect(end - start).toBeLessThan(50);
  });

  test('should be chainable with other promises', async () => {
    const start = Date.now();

    const result = await sleep(100)
      .then(() => 'completed')
      .then((msg) => `${msg}!`);

    const end = Date.now();

    expect(result).toBe('completed!');
    expect(end - start).toBeGreaterThanOrEqual(90);
  });

  test('should work in Promise.all', async () => {
    const start = Date.now();

    await Promise.all([sleep(100), sleep(100), sleep(100)]);

    const end = Date.now();

    // Should complete around 100ms (parallel execution)
    expect(end - start).toBeGreaterThanOrEqual(90);
    expect(end - start).toBeLessThan(200);
  });

  test('should work with async/await in loops', async () => {
    const results = [];
    const start = Date.now();

    // eslint-disable-next-line no-restricted-syntax
    for (let i = 0; i < 3; i += 1) {
      await sleep(50);
      results.push(i);
    }

    const end = Date.now();

    expect(results).toEqual([0, 1, 2]);
    expect(end - start).toBeGreaterThanOrEqual(140); // 3 * 50ms
  });
});
