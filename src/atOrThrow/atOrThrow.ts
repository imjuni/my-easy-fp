/**
 * Same behavior of Array.prototype.at but at function result will be undefined throw exception.
 *
 * @param values array arguments
 * @param index array index arguments
 * @returns element of array at the index order
 */

export default function atOrThrow<T>(values: T | T[], index: number): NonNullable<T> {
  if (!Array.isArray(values) && values == null) {
    throw new Error(`Invalid Index: ${index}/ ${values}`);
  }

  if (!Array.isArray(values)) {
    return values;
  }

  const element = values.at(index);

  if (element == null) {
    throw new Error(`Invalid Index: ${index}/ ${values.length}`);
  }

  return element;
}
