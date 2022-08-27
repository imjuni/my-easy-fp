import isNull from '../isNull/isNull';

export default function isNotNull<T>(value?: T | null): value is T {
  return !isNull(value);
}
