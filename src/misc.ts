export function typedkey<KT extends string | number | symbol, VT, O extends Record<KT, VT>>(
  value: O,
  convertor?: (k: string) => keyof O,
): (keyof O)[] {
  return convertor !== undefined && convertor !== null
    ? (Object.keys(value) as any).map((key: any) => convertor(key))
    : (Object.keys(value) as any);
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export function getRandomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomRangeInt(min: number, max: number) {
  const ceiledMin = Math.ceil(min);
  const flooredMax = Math.floor(max);
  return Math.floor(Math.random() * (flooredMax - ceiledMin)) + min;
}
