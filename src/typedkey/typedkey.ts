export default function typedkey<O extends object>(value: O): (keyof O)[] {
  return Object.keys(value) as any;
}
