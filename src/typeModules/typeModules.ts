/**
 * Every Utility Types from [type-fest](https://github.com/sindresorhus/type-fest).
 * Strongly recommand use type-fest.
 */

/**
 * @deprecated will be deprecate next version: 0.15.0
 */
export type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2
  ? true
  : false;

/**
 * @deprecated will be deprecate next version: 0.15.0
 */
export interface SimplifyOptions {
  /**
	Do the simplification recursively.

	@default false
	*/
  deep?: boolean;
}

/**
 * @deprecated will be deprecate next version: 0.15.0
 */
export type Flatten<AnyType, Options extends SimplifyOptions = {}> = Options['deep'] extends true
  ? { [KeyType in keyof AnyType]: Simplify<AnyType[KeyType], Options> }
  : { [KeyType in keyof AnyType]: AnyType[KeyType] };

/**
 * @deprecated will be deprecate next version: 0.15.0
 */
export type Filter<KeyType, ExcludeType> = IsEqual<KeyType, ExcludeType> extends true
  ? never
  : KeyType extends ExcludeType
  ? never
  : KeyType;

/**
 * @deprecated will be deprecate next version: 0.15.0
 */
export type Simplify<
  AnyType,
  Options extends SimplifyOptions = {},
> = Flatten<AnyType> extends AnyType ? Flatten<AnyType, Options> : AnyType;

/**
 * @deprecated will be deprecate next version: 0.15.0
 */
export type Except<ObjectType, KeysType extends keyof ObjectType> = {
  [KeyType in keyof ObjectType as Filter<KeyType, KeysType>]: ObjectType[KeyType];
};

/**
 * @deprecated will be deprecate next version: 0.15.0
 */
export type SetOptional<BaseType, Keys extends keyof BaseType> = Simplify<
  // Pick just the keys that are readonly from the base type.
  Except<BaseType, Keys> &
    // Pick the keys that should be mutable from the base type and make them mutable.
    Partial<Pick<BaseType, Keys>>
>;

/**
 * @deprecated will be deprecate next version: 0.15.0
 */
export type SetRequired<BaseType, Keys extends keyof BaseType> = Simplify<
  // Pick just the keys that are optional from the base type.
  Except<BaseType, Keys> &
    // Pick the keys that should be required from the base type and make them required.
    Required<Pick<BaseType, Keys>>
>;
