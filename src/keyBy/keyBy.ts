export default function keyBy<T extends Record<K, PropertyKey>, K extends keyof T>(
  arr: T[],
  keyName: K,
): Partial<Record<T[K], T>> {
  return arr.reduce<Partial<Record<T[K], T>>>((aggregation, item) => {
    return { ...aggregation, [item[keyName]]: item };
  }, {});
}
