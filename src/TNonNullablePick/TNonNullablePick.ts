import { SetRequired } from '../typeModules/typeModules';

/**
 * Recommand use `SetRequired` in [type-fest](https://github.com/sindresorhus/type-fest).
 *
 * @deprecated will be deprecate next version
 */
type TNonNullablePick<T, K extends keyof T> = SetRequired<T, K>;

export default TNonNullablePick;
