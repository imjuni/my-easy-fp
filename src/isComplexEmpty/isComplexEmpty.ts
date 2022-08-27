/**
 * Return `true` if the given value is empty value. Do additional checks based on the type of value given.
 *
 * * `number` type checks isNaN
 * * `string` type checks empty string
 * * `object` type and array checks whether the length of value is zero
 * * `object` type and object(also exclude instance of Date) whether the number of object key is zero
 *
 * @param value value you want to check it's empty
 */
export default function isComplexEmpty<T>(value?: T | undefined | null): value is null | undefined {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'number' && Number.isNaN(value)) {
    return true;
  }

  if (typeof value === 'string' && value === '') {
    return true;
  }

  if (typeof value === 'object' && Array.isArray(value) && value.length < 1) {
    return true;
  }

  if (typeof value === 'object' && !(value instanceof Date) && Object.keys(value).length < 1) {
    return true;
  }

  return false;
}
