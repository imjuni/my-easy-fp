export default function typedkey<KT extends string | number | symbol, VT, O extends Record<KT, VT>>(
  value: O,
  convertor?: (k: string) => keyof O,
): (keyof O)[] {
  return convertor !== undefined && convertor !== null
    ? (Object.keys(value) as any).map((key: any) => convertor(key))
    : (Object.keys(value) as any);
}
