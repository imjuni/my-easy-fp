import { describe, expectTypeOf, test } from 'vitest';

import type {
  Except,
  Filter,
  Flatten,
  IsEqual,
  SetOptional,
  SetRequired,
  Simplify,
  SimplifyOptions,
} from './typeModules';

describe('typeModules utilities', () => {
  describe('IsEqual', () => {
    test('should correctly identify equal types', () => {
      expectTypeOf<IsEqual<string, string>>().toEqualTypeOf<true>();
      expectTypeOf<IsEqual<number, number>>().toEqualTypeOf<true>();
      expectTypeOf<IsEqual<{ a: string }, { a: string }>>().toEqualTypeOf<true>();
    });

    test('should correctly identify different types', () => {
      expectTypeOf<IsEqual<string, number>>().toEqualTypeOf<false>();
      expectTypeOf<IsEqual<{ a: string }, { b: string }>>().toEqualTypeOf<false>();
      expectTypeOf<IsEqual<string[], number[]>>().toEqualTypeOf<false>();
    });

    test('should work with complex types', () => {
      interface TypeA {
        id: number;
        name: string;
      }
      interface TypeB {
        id: number;
        name: string;
      }
      interface TypeC {
        id: string;
        name: string;
      }

      expectTypeOf<IsEqual<TypeA, TypeB>>().toEqualTypeOf<true>();
      expectTypeOf<IsEqual<TypeA, TypeC>>().toEqualTypeOf<false>();
    });
  });

  describe('Filter', () => {
    test('should filter out matching types', () => {
      expectTypeOf<Filter<'a', 'a'>>().toEqualTypeOf<never>();
      expectTypeOf<Filter<'a', 'b'>>().toEqualTypeOf<'a'>();
    });

    test('should work with union types', () => {
      expectTypeOf<Filter<'a' | 'b' | 'c', 'a'>>().toEqualTypeOf<'b' | 'c'>();
      expectTypeOf<Filter<string | number, string>>().toEqualTypeOf<number>();
    });
  });

  describe('Except', () => {
    test('should exclude specified keys', () => {
      interface TestObject {
        a: string;
        b: number;
        c: boolean;
      }

      type WithoutA = Except<TestObject, 'a'>;
      expectTypeOf<WithoutA>().toEqualTypeOf<{
        b: number;
        c: boolean;
      }>();

      type WithoutMultiple = Except<TestObject, 'a' | 'c'>;
      expectTypeOf<WithoutMultiple>().toEqualTypeOf<{
        b: number;
      }>();
    });

    test('should work with complex object types', () => {
      interface User {
        id: number;
        name: string;
        email: string;
        metadata: { created: Date };
      }

      type PublicUser = Except<User, 'metadata'>;
      expectTypeOf<PublicUser>().toEqualTypeOf<{
        id: number;
        name: string;
        email: string;
      }>();
    });
  });

  describe('Flatten', () => {
    test('should flatten object type', () => {
      type NestedType = {
        a: string;
      } & {
        b: number;
      };

      type Flattened = Flatten<NestedType>;
      expectTypeOf<Flattened>().toEqualTypeOf<{
        a: string;
        b: number;
      }>();
    });

    test('should handle empty objects', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      interface Empty {}
      type FlattenedEmpty = Flatten<Empty>;
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      expectTypeOf<FlattenedEmpty>().toEqualTypeOf<{}>();
    });
  });

  describe('Simplify', () => {
    test('should simplify complex intersection types', () => {
      type ComplexType = { a: string } & { b: number } & { c: boolean };
      type Simplified = Simplify<ComplexType>;

      expectTypeOf<Simplified>().toEqualTypeOf<{
        a: string;
        b: number;
        c: boolean;
      }>();
    });

    test('should work with options', () => {
      interface ComplexNested {
        user: { id: number } & { name: string };
        config: { enabled: boolean } & { timeout: number };
      }

      type SimplifiedShallow = Simplify<ComplexNested>;
      type SimplifiedDeep = Simplify<ComplexNested, { deep: true }>;

      expectTypeOf<SimplifiedShallow>().toEqualTypeOf<{
        user: { id: number } & { name: string };
        config: { enabled: boolean } & { timeout: number };
      }>();

      expectTypeOf<SimplifiedDeep>().toEqualTypeOf<{
        user: { id: number; name: string };
        config: { enabled: boolean; timeout: number };
      }>();
    });
  });

  describe('SetOptional', () => {
    test('should make specified keys optional', () => {
      interface TestObject {
        a: string;
        b: number;
        c: boolean;
      }

      type WithOptionalA = SetOptional<TestObject, 'a'>;
      expectTypeOf<WithOptionalA>().toEqualTypeOf<{
        a?: string;
        b: number;
        c: boolean;
      }>();

      type WithOptionalMultiple = SetOptional<TestObject, 'a' | 'c'>;
      expectTypeOf<WithOptionalMultiple>().toEqualTypeOf<{
        a?: string;
        b: number;
        c?: boolean;
      }>();
    });

    test('should work with already optional properties', () => {
      interface MixedObject {
        required: string;
        optional?: number;
      }

      type Modified = SetOptional<MixedObject, 'required'>;
      expectTypeOf<Modified>().toEqualTypeOf<{
        required?: string;
        optional?: number;
      }>();
    });
  });

  describe('SetRequired', () => {
    test('should make specified optional keys required', () => {
      interface TestObject {
        a?: string;
        b?: number;
        c: boolean;
      }

      type WithRequiredA = SetRequired<TestObject, 'a'>;
      expectTypeOf<WithRequiredA>().toEqualTypeOf<{
        a: string;
        b?: number;
        c: boolean;
      }>();

      type WithRequiredMultiple = SetRequired<TestObject, 'a' | 'b'>;
      expectTypeOf<WithRequiredMultiple>().toEqualTypeOf<{
        a: string;
        b: number;
        c: boolean;
      }>();
    });

    test('should work with already required properties', () => {
      interface MixedObject {
        required: string;
        optional?: number;
      }

      type Modified = SetRequired<MixedObject, 'optional'>;
      expectTypeOf<Modified>().toEqualTypeOf<{
        required: string;
        optional: number;
      }>();
    });
  });

  describe('SimplifyOptions', () => {
    test('should define correct interface shape', () => {
      type Options1 = SimplifyOptions;
      interface Options2 {
        deep?: boolean;
      }

      expectTypeOf<Options1>().toEqualTypeOf<Options2>();

      // Should accept both forms
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      expectTypeOf<{}>().toMatchTypeOf<SimplifyOptions>();
      expectTypeOf<{ deep: true }>().toMatchTypeOf<SimplifyOptions>();
      expectTypeOf<{ deep: false }>().toMatchTypeOf<SimplifyOptions>();
    });
  });

  describe('Complex integration scenarios', () => {
    test('should work together in complex scenarios', () => {
      interface BaseUser {
        id: number;
        name: string;
        email?: string;
        profile?: {
          bio: string;
          avatar?: string;
        };
      }

      // Make email required and profile optional
      type ModifiedUser = SetRequired<SetOptional<BaseUser, 'profile'>, 'email'>;

      expectTypeOf<ModifiedUser>().toEqualTypeOf<{
        id: number;
        name: string;
        email: string;
        profile?: {
          bio: string;
          avatar?: string;
        };
      }>();
    });

    test('should handle edge cases with nested utilities', () => {
      interface ComplexType {
        data: { value: string } & { meta: number };
        optional?: boolean;
      }

      type Processed = Simplify<SetRequired<ComplexType, 'optional'>>;

      expectTypeOf<Processed>().toEqualTypeOf<{
        data: { value: string; meta: number };
        optional: boolean;
      }>();
    });
  });
});
