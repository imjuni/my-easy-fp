import isNotNull from '../isNotNull/isNotNull';
import isNotUndefined from '../isNotUndefined/isNotUndefined';

export default function isNotEmpty<T>(value?: T | undefined | null): value is T {
  return isNotUndefined(value) && isNotNull(value);
}
