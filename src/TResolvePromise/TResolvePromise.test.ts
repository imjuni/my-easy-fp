import { describe, expectTypeOf, test } from 'vitest';

import type TResolvePromise from './TResolvePromise';

describe('TResolvePromise type utility', () => {
  test('should extract resolved type from Promise', () => {
    type StringPromise = Promise<string>;
    type NumberPromise = Promise<number>;
    type BooleanPromise = Promise<boolean>;

    expectTypeOf<TResolvePromise<StringPromise>>().toEqualTypeOf<string>();
    expectTypeOf<TResolvePromise<NumberPromise>>().toEqualTypeOf<number>();
    expectTypeOf<TResolvePromise<BooleanPromise>>().toEqualTypeOf<boolean>();
  });

  test('should extract complex object types from Promise', () => {
    interface User {
      id: number;
      name: string;
      email: string;
    }
    type UserPromise = Promise<User>;

    interface ApiResponse {
      status: 'success' | 'error';
      data: unknown;
      message: string;
    }
    type ApiPromise = Promise<ApiResponse>;

    expectTypeOf<TResolvePromise<UserPromise>>().toEqualTypeOf<User>();
    expectTypeOf<TResolvePromise<ApiPromise>>().toEqualTypeOf<ApiResponse>();
  });

  test('should extract array types from Promise', () => {
    type StringArrayPromise = Promise<string[]>;
    type UserArrayPromise = Promise<{ id: number; name: string }[]>;

    expectTypeOf<TResolvePromise<StringArrayPromise>>().toEqualTypeOf<string[]>();
    expectTypeOf<TResolvePromise<UserArrayPromise>>().toEqualTypeOf<
      { id: number; name: string }[]
    >();
  });

  test('should extract union types from Promise', () => {
    type UnionPromise = Promise<string | number>;
    type ComplexUnionPromise = Promise<'success' | 'error' | 'pending'>;

    expectTypeOf<TResolvePromise<UnionPromise>>().toEqualTypeOf<string | number>();
    expectTypeOf<TResolvePromise<ComplexUnionPromise>>().toEqualTypeOf<
      'success' | 'error' | 'pending'
    >();
  });

  test('should extract function types from Promise', () => {
    type FunctionPromise = Promise<() => void>;
    type CallbackPromise = Promise<(value: string) => number>;
    type AsyncFunctionPromise = Promise<(id: number) => Promise<string>>;

    expectTypeOf<TResolvePromise<FunctionPromise>>().toEqualTypeOf<() => void>();
    expectTypeOf<TResolvePromise<CallbackPromise>>().toEqualTypeOf<(value: string) => number>();
    expectTypeOf<TResolvePromise<AsyncFunctionPromise>>().toEqualTypeOf<
      (id: number) => Promise<string>
    >();
  });

  test('should handle nested Promise types', () => {
    type NestedPromise = Promise<Promise<string>>;
    type TripleNestedPromise = Promise<Promise<Promise<number>>>;

    expectTypeOf<TResolvePromise<NestedPromise>>().toEqualTypeOf<Promise<string>>();
    expectTypeOf<TResolvePromise<TripleNestedPromise>>().toEqualTypeOf<Promise<Promise<number>>>();
  });

  test('should work with void Promise', () => {
    type VoidPromise = Promise<void>;
    type ResolvedVoid = TResolvePromise<VoidPromise>;

    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    expectTypeOf<ResolvedVoid>().toEqualTypeOf<void>();
  });

  test('should work with null and undefined Promise', () => {
    type NullPromise = Promise<null>;
    type UndefinedPromise = Promise<undefined>;

    expectTypeOf<TResolvePromise<NullPromise>>().toEqualTypeOf<null>();
    expectTypeOf<TResolvePromise<UndefinedPromise>>().toEqualTypeOf<undefined>();
  });

  test('should work with literal types', () => {
    type StringLiteralPromise = Promise<'success'>;
    type NumberLiteralPromise = Promise<42>;
    type BooleanLiteralPromise = Promise<true>;

    expectTypeOf<TResolvePromise<StringLiteralPromise>>().toEqualTypeOf<'success'>();
    expectTypeOf<TResolvePromise<NumberLiteralPromise>>().toEqualTypeOf<42>();
    expectTypeOf<TResolvePromise<BooleanLiteralPromise>>().toEqualTypeOf<true>();
  });

  test('should handle generic Promise types', () => {
    type GenericPromise<T> = Promise<T>;

    expectTypeOf<TResolvePromise<GenericPromise<string>>>().toEqualTypeOf<string>();
    expectTypeOf<TResolvePromise<GenericPromise<number[]>>>().toEqualTypeOf<number[]>();
    expectTypeOf<TResolvePromise<GenericPromise<{ id: string }>>>().toEqualTypeOf<{ id: string }>();
  });

  test('should work with any and unknown Promise', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type AnyPromise = Promise<any>;
    type UnknownPromise = Promise<unknown>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expectTypeOf<TResolvePromise<AnyPromise>>().toEqualTypeOf<any>();
    expectTypeOf<TResolvePromise<UnknownPromise>>().toEqualTypeOf<unknown>();
  });

  test('should work with Record and Map types', () => {
    type RecordPromise = Promise<Record<string, number>>;
    type MapPromise = Promise<Map<string, number>>;
    type SetPromise = Promise<Set<string>>;

    expectTypeOf<TResolvePromise<RecordPromise>>().toEqualTypeOf<Record<string, number>>();
    expectTypeOf<TResolvePromise<MapPromise>>().toEqualTypeOf<Map<string, number>>();
    expectTypeOf<TResolvePromise<SetPromise>>().toEqualTypeOf<Set<string>>();
  });

  test('should preserve optional properties in resolved types', () => {
    interface UserWithOptionals {
      id: number;
      name: string;
      email?: string;
      phone?: string;
    }
    type OptionalUserPromise = Promise<UserWithOptionals>;

    expectTypeOf<TResolvePromise<OptionalUserPromise>>().toEqualTypeOf<UserWithOptionals>();
  });

  test('should work with readonly types', () => {
    interface ReadonlyUser {
      readonly id: number;
      readonly name: string;
    }
    type ReadonlyUserPromise = Promise<ReadonlyUser>;

    expectTypeOf<TResolvePromise<ReadonlyUserPromise>>().toEqualTypeOf<ReadonlyUser>();
  });
});
