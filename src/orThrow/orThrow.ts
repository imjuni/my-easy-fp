/**
 * If the value is null or undefined, throw an error.
 *
 * @param value any type of value
 * @returns non nullable value
 */

export default function orThrow<T>(value: T | undefined, err?: Error): T {
  if (value != null) {
    return value;
  }

  throw err ?? new Error('invalid value');
}
