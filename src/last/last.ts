export default function last<T>(arr: T[]): T {
  const elem = arr[arr.length - 1];
  return elem;
}
