export default function isUndefined<T>(value?: T): value is undefined {
  if (value === undefined) {
    return true;
  }

  return false;
}
