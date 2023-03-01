export default function last<T>(arr: T[]): T {
  const item = arr[arr.length - 1];

  if (item == null) {
    throw new Error('invalid last index');
  }
  return item;
}
