import type { SetRequired } from '../typeModules/typeModules';

/**
 * Recommand use `SetRequired` in [type-fest](https://github.com/sindresorhus/type-fest).
 *
 * @deprecated will be deprecate next version
 */
type TNonNullableObject<T> = SetRequired<T, keyof T>;

export default TNonNullableObject;
