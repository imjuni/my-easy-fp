export default function isUndefined<T>(value?: T | undefined): value is undefined {
  if (value === undefined) {
    return true;
  }

  return false;
}
