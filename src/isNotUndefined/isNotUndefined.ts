import isUndefined from '../isUndefined/isUndefined.ts';

export default function isNotUndefined<T>(value?: T): value is T {
  return !isUndefined(value);
}
