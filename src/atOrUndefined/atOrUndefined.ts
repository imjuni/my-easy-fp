/**
 * Same behavior of Array.prototype.at but at function result will be undefined return undefined.
 *
 * @param values array arguments
 * @param index array index arguments
 * @returns element of array at the index order
 */

export default function atOrUndefined<T>(values: T | T[], index: number): T | undefined {
  if (!Array.isArray(values) && values == null) {
    return undefined;
  }

  if (!Array.isArray(values)) {
    return values;
  }

  if (values.length <= index) {
    return undefined;
  }

  const element = values[index];

  if (element == null) {
    return undefined;
  }

  return element;
}
