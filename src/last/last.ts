export default function last<T, E extends Error>(arr: T[], err?: E): T {
  const item = arr[arr.length - 1];

  if (item == null) {
    throw err ?? new Error('invalid last index');
  }
  return item;
}
