function firstFromArray<T>(arr: T[]): T {
  const [elem] = arr;
  return elem;
}

export default function first<T>(arr: T | T[]): T {
  if (Array.isArray(arr)) {
    return firstFromArray(arr);
  }

  return arr;
}
