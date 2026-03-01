import { describe, expectTypeOf, test } from 'vitest';

import type TResolveArray from './TResolveArray';

describe('TResolveArray type utility', () => {
  test('should extract element type from array types', () => {
    type StringArray = string[];
    type NumberArray = number[];
    type BooleanArray = boolean[];

    expectTypeOf<TResolveArray<StringArray>>().toEqualTypeOf<string>();
    expectTypeOf<TResolveArray<NumberArray>>().toEqualTypeOf<number>();
    expectTypeOf<TResolveArray<BooleanArray>>().toEqualTypeOf<boolean>();
  });

  test('should extract element type from tuple types', () => {
    type StringTuple = [string, string];
    type MixedTuple = [string, number, boolean];
    type SingleElementTuple = [number];

    expectTypeOf<TResolveArray<StringTuple>>().toEqualTypeOf<string>();
    expectTypeOf<TResolveArray<MixedTuple>>().toEqualTypeOf<string | number | boolean>();
    expectTypeOf<TResolveArray<SingleElementTuple>>().toEqualTypeOf<number>();
  });

  test('should return original type for non-array types', () => {
    type StringType = string;
    type NumberType = number;
    interface ObjectType {
      id: number;
      name: string;
    }

    expectTypeOf<TResolveArray<StringType>>().toEqualTypeOf<string>();
    expectTypeOf<TResolveArray<NumberType>>().toEqualTypeOf<number>();
    expectTypeOf<TResolveArray<ObjectType>>().toEqualTypeOf<ObjectType>();
  });

  test('should work with union array types', () => {
    type UnionArray = (string | number)[];
    type ComplexUnionArray = (string | number | { id: number })[];

    expectTypeOf<TResolveArray<UnionArray>>().toEqualTypeOf<string | number>();
    expectTypeOf<TResolveArray<ComplexUnionArray>>().toEqualTypeOf<
      string | number | { id: number }
    >();
  });

  test('should work with nested array types', () => {
    type NestedStringArray = string[][];
    type TripleNestedArray = number[][][];

    expectTypeOf<TResolveArray<NestedStringArray>>().toEqualTypeOf<string[]>();
    expectTypeOf<TResolveArray<TripleNestedArray>>().toEqualTypeOf<number[][]>();
  });

  test('should work with object array types', () => {
    interface User {
      id: number;
      name: string;
    }
    type UserArray = User[];

    expectTypeOf<TResolveArray<UserArray>>().toEqualTypeOf<User>();

    interface ComplexObject {
      data: {
        items: string[];
        count: number;
      };
    }
    type ComplexArray = ComplexObject[];

    expectTypeOf<TResolveArray<ComplexArray>>().toEqualTypeOf<ComplexObject>();
  });

  test('should work with function array types', () => {
    type FunctionArray = (() => void)[];
    type CallbackArray = ((value: string) => number)[];

    expectTypeOf<TResolveArray<FunctionArray>>().toEqualTypeOf<() => void>();
    expectTypeOf<TResolveArray<CallbackArray>>().toEqualTypeOf<(value: string) => number>();
  });

  test('should work with readonly array types', () => {
    type ReadonlyStringArray = readonly string[];
    type ReadonlyNumberArray = readonly number[];

    expectTypeOf<TResolveArray<ReadonlyStringArray>>().toEqualTypeOf<string>();
    expectTypeOf<TResolveArray<ReadonlyNumberArray>>().toEqualTypeOf<number>();
  });

  test('should work with Array<T> syntax', () => {
    type StringArrayGeneric = string[];
    type NumberArrayGeneric = number[];
    type ObjectArrayGeneric = { id: string }[];

    expectTypeOf<TResolveArray<StringArrayGeneric>>().toEqualTypeOf<string>();
    expectTypeOf<TResolveArray<NumberArrayGeneric>>().toEqualTypeOf<number>();
    expectTypeOf<TResolveArray<ObjectArrayGeneric>>().toEqualTypeOf<{ id: string }>();
  });

  test('should preserve literal types', () => {
    type LiteralArray = ('red' | 'green' | 'blue')[];
    type NumberLiteralArray = (1 | 2 | 3)[];

    expectTypeOf<TResolveArray<LiteralArray>>().toEqualTypeOf<'red' | 'green' | 'blue'>();
    expectTypeOf<TResolveArray<NumberLiteralArray>>().toEqualTypeOf<1 | 2 | 3>();
  });

  test('should handle edge cases', () => {
    type NeverArray = never[];
    type AnyArray = unknown[];
    type UnknownArray = unknown[];

    expectTypeOf<TResolveArray<NeverArray>>().toEqualTypeOf<never>();
    expectTypeOf<TResolveArray<AnyArray>>().toEqualTypeOf<unknown>();
    expectTypeOf<TResolveArray<UnknownArray>>().toEqualTypeOf<unknown>();
  });

  test('should work with const assertions', () => {
    type ConstArray = readonly ['a', 'b', 'c'];
    type ConstTuple = readonly [1, 2, 3];

    expectTypeOf<TResolveArray<ConstArray>>().toEqualTypeOf<'a' | 'b' | 'c'>();
    expectTypeOf<TResolveArray<ConstTuple>>().toEqualTypeOf<1 | 2 | 3>();
  });
});
