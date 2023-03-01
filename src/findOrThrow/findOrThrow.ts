/**
 * Same behavior of Array.prototype.find but at function result will be undefined throw exception.
 *
 * @param values array arguments
 * @param predicate predicate function
 * @returns find result
 */
export default function findOrThrow<T>(
  values: T[],
  predicate: (value: T, index: number, obj: T[]) => unknown,
  err?: Error,
): T {
  const result = values.find(predicate);

  if (result == null) {
    throw err != null ? err : new Error('findOrThrow got undefined result');
  }

  return result;
}
