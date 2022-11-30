/**
 * Recommand use `LastArrayElement` in [type-fest](https://github.com/sindresorhus/type-fest).
 *
 * @deprecated will be deprecate next version
 */
type TResolveArray<T> = T extends (infer U)[] ? U : T;

export default TResolveArray;
