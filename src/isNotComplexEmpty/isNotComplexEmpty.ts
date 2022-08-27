import isComplexEmpty from '../isComplexEmpty/isComplexEmpty';

/**
 * Return `true` if the given value is non-empty value. Do additional checks based on the type of value given.
 * Returns the invert of result of `isComplexEmpty`
 *
 * @param value value you want to check it's non-empty
 */
export default function isNotComplexEmpty<T>(value?: T | null | undefined): value is T {
  return !isComplexEmpty<T>(value);
}
