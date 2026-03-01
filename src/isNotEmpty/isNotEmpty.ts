import isNotNull from '../isNotNull/isNotNull.ts';
import isNotUndefined from '../isNotUndefined/isNotUndefined.ts';

export default function isNotEmpty<T>(value?: T | null): value is T {
  return isNotUndefined(value) && isNotNull(value);
}
