export default function settify<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}
