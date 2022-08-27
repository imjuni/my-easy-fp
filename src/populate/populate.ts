export default function populate(size: number, oneBase?: boolean): number[] {
  const base = oneBase === undefined || oneBase === null ? 0 : 1;
  return new Array<number>(size).fill(0).map((_, index) => index + base);
}
