export default function isNull<T>(value?: T | null): value is null {
  if (value === null) {
    return true;
  }

  return false;
}
