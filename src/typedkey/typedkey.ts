/**
 * Same behavior of Object.keys but at function result type alised keyof O
 */
export default function typedkey<O extends object>(value: O): (keyof O)[] {
  return Object.keys(value) as (keyof O)[];
}
