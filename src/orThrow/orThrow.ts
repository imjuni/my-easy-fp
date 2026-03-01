/**
 * If the value is null or undefined, throw an error.
 *
 * @param value any type of value
 * @returns non nullable value
 */

export default function orThrow<T, E extends Error>(value: T | undefined, err?: E): NonNullable<T> {
  if (value != null) {
    return value;
  }

  throw err ?? new Error('invalid value');
}
