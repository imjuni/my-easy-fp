import isUndefined from '../isUndefined/isUndefined';

export default function isNotUndefined<T>(value?: T | undefined): value is T {
  return !isUndefined(value);
}
