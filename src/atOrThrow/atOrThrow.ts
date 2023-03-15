/**
 * Same behavior of Array.prototype.at but at function result will be undefined throw exception.
 *
 * @param values array arguments
 * @param index array index arguments
 * @returns element of array at the index order
 */

export default function atOrThrow<T>(values: T | T[], index: number, err?: Error): NonNullable<T> {
  if (!Array.isArray(values) && values == null) {
    throw err != null ? err : new Error(`Invalid Index: ${index}`);
  }

  if (!Array.isArray(values)) {
    return values;
  }

  if (index < 0 && values.length + index >= 0) {
    const element = values[values.length + index]!;
    return element;
  }

  if (values.length <= index) {
    throw err != null ? err : new Error(`Invalid Index: ${index}/ ${values.length}`);
  }

  const element = values[index];

  if (element == null) {
    throw err != null ? err : new Error(`Invalid Index: ${index}/ ${values.length}`);
  }

  return element;
}
