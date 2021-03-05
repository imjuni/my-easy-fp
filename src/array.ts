export function populate(size: number, oneBase?: boolean): number[] {
  const base = oneBase === undefined || oneBase === null ? 0 : 1;
  return new Array<number>(size).fill(0).map((_, index) => index + base);
}

export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
}

function firstFromArray<T>(arr: T[]): T {
  const [elem] = arr;
  return elem;
}

export function last<T>(arr: T[]): T {
  const elem = arr[arr.length - 1];
  return elem;
}

export function first<T>(arr: T | T[]): T {
  if (Array.isArray(arr)) {
    return firstFromArray(arr);
  }

  return arr;
}

export function toArray<T>(arr: T | T[]): T[] {
  if (Array.isArray(arr)) {
    return arr;
  }

  return [arr];
}
