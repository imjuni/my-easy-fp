import isNull from '../isNull/isNull.ts';
import isUndefined from '../isUndefined/isUndefined.ts';

export default function isEmpty<T>(value?: T | null): value is undefined | null {
  return isUndefined(value) || isNull(value);
}
