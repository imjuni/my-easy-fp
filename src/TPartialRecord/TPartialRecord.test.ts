import { describe, expectTypeOf, test } from 'vitest';

import type PartialRecord from './TPartialRecord';

describe('PartialRecord type utility', () => {
  test('should create record with optional keys', () => {
    type TestRecord = PartialRecord<'a' | 'b' | 'c', string>;

    // All properties should be optional
    expectTypeOf<TestRecord>().toEqualTypeOf<{
      a?: string;
      b?: string;
      c?: string;
    }>();

    // Should accept empty object
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    expectTypeOf<{}>().toMatchTypeOf<TestRecord>();

    // Should accept partial objects
    expectTypeOf<{ a: 'value' }>().toMatchTypeOf<TestRecord>();
    expectTypeOf<{ a: 'value'; b: 'another' }>().toMatchTypeOf<TestRecord>();
    expectTypeOf<{ a: 'value'; b: 'another'; c: 'third' }>().toMatchTypeOf<TestRecord>();
  });

  test('should work with different value types', () => {
    type NumberRecord = PartialRecord<'x' | 'y' | 'z', number>;
    type BooleanRecord = PartialRecord<'enabled' | 'visible', boolean>;

    expectTypeOf<NumberRecord>().toEqualTypeOf<{
      x?: number;
      y?: number;
      z?: number;
    }>();

    expectTypeOf<BooleanRecord>().toEqualTypeOf<{
      enabled?: boolean;
      visible?: boolean;
    }>();
  });

  test('should work with object value types', () => {
    interface User {
      id: number;
      name: string;
    }
    type UserRecord = PartialRecord<'admin' | 'guest', User>;

    expectTypeOf<UserRecord>().toEqualTypeOf<{
      admin?: User;
      guest?: User;
    }>();

    expectTypeOf<{ admin: { id: 1; name: 'Admin' } }>().toMatchTypeOf<UserRecord>();
  });

  test('should work with string literal keys', () => {
    type StatusRecord = PartialRecord<'success' | 'error' | 'pending', string>;

    expectTypeOf<StatusRecord>().toEqualTypeOf<{
      success?: string;
      error?: string;
      pending?: string;
    }>();

    // Should not accept invalid keys
    expectTypeOf<{ invalid: 'key' }>().not.toMatchTypeOf<StatusRecord>();
  });

  test('should work with union value types', () => {
    type MixedRecord = PartialRecord<'data', string | number | boolean>;

    expectTypeOf<MixedRecord>().toEqualTypeOf<{
      data?: string | number | boolean;
    }>();

    expectTypeOf<{ data: 'string' }>().toMatchTypeOf<MixedRecord>();
    expectTypeOf<{ data: 123 }>().toMatchTypeOf<MixedRecord>();
    expectTypeOf<{ data: true }>().toMatchTypeOf<MixedRecord>();
  });

  test('should work with complex key types', () => {
    enum Color {
      Red = 'red',
      Blue = 'blue',
      Green = 'green',
    }

    type ColorRecord = PartialRecord<Color, string>;

    expectTypeOf<ColorRecord>().toEqualTypeOf<{
      [Color.Red]?: string;
      [Color.Blue]?: string;
      [Color.Green]?: string;
    }>();
  });
});
