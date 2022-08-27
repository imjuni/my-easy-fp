import { SetRequired } from '../typeModules/typeModules';

/**
 * Recommand use `SetRequired` in [type-fest](https://github.com/sindresorhus/type-fest).
 *
 * @deprecated will be deprecate next version: 0.15.0
 */
type TNonNullableObject<T> = SetRequired<T, keyof T>;

export default TNonNullableObject;
