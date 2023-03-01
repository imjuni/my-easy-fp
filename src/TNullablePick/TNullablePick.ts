import type { SetOptional } from '../typeModules/typeModules';

/**
 * Recommand use `SetOptional` in [type-fest](https://github.com/sindresorhus/type-fest).
 *
 * @deprecated will be deprecate next version
 */
type TNullablePick<T, K extends keyof T> = SetOptional<T, K>;

export default TNullablePick;
