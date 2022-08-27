import { SetRequired } from '../typeModules/typeModules';

/**
 * Recommand use `SetRequired` in [type-fest](https://github.com/sindresorhus/type-fest).
 *
 * @deprecated will be deprecate next version: 0.15.0
 */
type TNonNullablePick<T, K extends keyof T> = SetRequired<T, K>;

export default TNonNullablePick;
