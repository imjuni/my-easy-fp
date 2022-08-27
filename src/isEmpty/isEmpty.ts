import isNull from '../isNull/isNull';
import isUndefined from '../isUndefined/isUndefined';

export default function isEmpty<T>(value?: T | undefined | null): value is undefined | null {
  return isUndefined(value) || isNull(value);
}
