import { describe, expectTypeOf, test } from 'vitest';

import type TNonNullableObject from './TNonNullableObject';

describe('TNonNullableObject type utility', () => {
  test('should make all properties required', () => {
    interface OptionalProps {
      a?: string;
      b?: number;
      c?: boolean;
    }

    type RequiredProps = TNonNullableObject<OptionalProps>;

    expectTypeOf<RequiredProps>().toEqualTypeOf<{
      a: string;
      b: number;
      c: boolean;
    }>();

    // Should not accept partial objects
    expectTypeOf<{ a: 'value' }>().not.toMatchTypeOf<RequiredProps>();
    expectTypeOf<{ a: 'value'; b: 123 }>().not.toMatchTypeOf<RequiredProps>();

    // Should accept complete objects
    expectTypeOf<{ a: 'value'; b: 123; c: true }>().toMatchTypeOf<RequiredProps>();
  });

  test('should work with mixed optional/required properties', () => {
    interface MixedProps {
      required: string;
      optional?: number;
      alsoOptional?: boolean;
    }

    type AllRequired = TNonNullableObject<MixedProps>;

    expectTypeOf<AllRequired>().toEqualTypeOf<{
      required: string;
      optional: number;
      alsoOptional: boolean;
    }>();
  });

  test('should work with nested object properties', () => {
    interface NestedProps {
      user?: {
        id: number;
        name?: string;
      };
      config?: {
        enabled: boolean;
        settings?: Record<string, unknown>;
      };
    }

    type RequiredNested = TNonNullableObject<NestedProps>;

    expectTypeOf<RequiredNested>().toEqualTypeOf<{
      user: {
        id: number;
        name?: string; // Note: nested optionals are not affected
      };
      config: {
        enabled: boolean;
        settings?: Record<string, unknown>;
      };
    }>();
  });

  test('should work with array and function properties', () => {
    interface ComplexProps {
      items?: string[];
      callback?: (value: string) => void;
      data?: Map<string, number>;
    }

    type RequiredComplex = TNonNullableObject<ComplexProps>;

    expectTypeOf<RequiredComplex>().toEqualTypeOf<{
      items: string[];
      callback: (value: string) => void;
      data: Map<string, number>;
    }>();
  });

  test('should preserve property types exactly', () => {
    interface WithUnionTypes {
      status?: 'pending' | 'success' | 'error';
      value?: string | number | null;
      nullable?: string | null;
    }

    type RequiredUnions = TNonNullableObject<WithUnionTypes>;

    expectTypeOf<RequiredUnions>().toEqualTypeOf<{
      status: 'pending' | 'success' | 'error';
      value: string | number | null;
      nullable: string | null;
    }>();
  });

  test('should work with empty object types', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Empty {}
    type RequiredEmpty = TNonNullableObject<Empty>;

    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    expectTypeOf<RequiredEmpty>().toEqualTypeOf<{}>();
  });

  test('should work with already required properties', () => {
    interface AlreadyRequired {
      name: string;
      age: number;
      active: boolean;
    }

    type StillRequired = TNonNullableObject<AlreadyRequired>;

    expectTypeOf<StillRequired>().toEqualTypeOf<AlreadyRequired>();
  });
});
