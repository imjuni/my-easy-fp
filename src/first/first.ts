function firstFromArray<T>(arr: T[]): T | undefined {
  const [elem] = arr;
  return elem;
}

export default function first<T>(arr: T | T[]): T {
  if (Array.isArray(arr)) {
    const item = firstFromArray(arr);

    if (item == null) {
      throw new Error('invalid first index');
    }

    return item;
  }

  return arr;
}
