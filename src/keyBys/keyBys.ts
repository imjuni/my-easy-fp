export default function keyBys<T extends Record<K, PropertyKey>, K extends keyof T>(
  arr: T[],
  keyName: K,
): Partial<Record<T[K], T[]>> {
  return arr.reduce<Partial<Record<T[K], T[]>>>((aggregation, item) => {
    return { ...aggregation, [item[keyName]]: [...(aggregation[item[keyName]] ?? []), item] };
  }, {});
}
