import { describe, expectTypeOf, test } from 'vitest';

import type TNonNullablePick from './TNonNullablePick';

describe('TNonNullablePick type utility', () => {
  test('should make specified optional keys required', () => {
    interface User {
      id: number;
      name: string;
      email?: string;
      phone?: string;
      age: number;
    }

    type UserWithRequiredEmail = TNonNullablePick<User, 'email'>;

    expectTypeOf<UserWithRequiredEmail>().toEqualTypeOf<{
      id: number;
      name: string;
      email: string;
      phone?: string;
      age: number;
    }>();

    // Should not accept objects without the required key
    expectTypeOf<{ id: 1; name: 'John'; age: 25 }>().not.toMatchTypeOf<UserWithRequiredEmail>();

    // Should accept objects with the required key
    expectTypeOf<{
      id: 1;
      name: 'John';
      email: 'john@example.com';
      age: 25;
    }>().toMatchTypeOf<UserWithRequiredEmail>();
  });

  test('should make multiple optional keys required', () => {
    interface Product {
      id: string;
      name: string;
      price: number;
      description?: string;
      category?: string;
      tags?: string[];
    }

    type ProductWithRequiredDetails = TNonNullablePick<Product, 'description' | 'category'>;

    expectTypeOf<ProductWithRequiredDetails>().toEqualTypeOf<{
      id: string;
      name: string;
      price: number;
      description: string;
      category: string;
      tags?: string[];
    }>();

    // Should require the specified keys
    expectTypeOf<{
      id: '1';
      name: 'Product';
      price: 100;
      description: 'A product';
      category: 'electronics';
    }>().toMatchTypeOf<ProductWithRequiredDetails>();

    // Should not accept objects missing required keys
    expectTypeOf<{
      id: '1';
      name: 'Product';
      price: 100;
    }>().not.toMatchTypeOf<ProductWithRequiredDetails>();
  });

  test('should work with already required properties', () => {
    interface Config {
      host: string;
      port: number;
      ssl?: boolean;
      timeout?: number;
    }

    type ConfigWithRequiredSsl = TNonNullablePick<Config, 'ssl'>;

    expectTypeOf<ConfigWithRequiredSsl>().toEqualTypeOf<{
      host: string;
      port: number;
      ssl: boolean;
      timeout?: number;
    }>();

    // Already required properties should remain required
    type ConfigWithRequiredHost = TNonNullablePick<Config, 'host'>;
    expectTypeOf<ConfigWithRequiredHost>().toEqualTypeOf<Config & { host: string }>();
  });

  test('should preserve property types exactly', () => {
    interface ApiResponse {
      status: 'success' | 'error';
      data?: Record<string, unknown>;
      message?: string;
      errors?: string[];
    }

    type ApiResponseWithRequiredData = TNonNullablePick<ApiResponse, 'data'>;

    expectTypeOf<ApiResponseWithRequiredData>().toEqualTypeOf<{
      status: 'success' | 'error';
      data: Record<string, unknown>;
      message?: string;
      errors?: string[];
    }>();

    // Should preserve union types
    expectTypeOf<{
      status: 'success';
      data: { result: 'ok' };
    }>().toMatchTypeOf<ApiResponseWithRequiredData>();
  });

  test('should work with complex nested types', () => {
    interface DatabaseEntity {
      id: string;
      createdAt?: Date;
      updatedAt?: Date;
      metadata?: {
        version: number;
        tags: string[];
      };
      owner?: {
        id: string;
        name: string;
      };
    }

    type EntityWithRequiredTimestamps = TNonNullablePick<DatabaseEntity, 'createdAt' | 'updatedAt'>;

    expectTypeOf<EntityWithRequiredTimestamps>().toEqualTypeOf<{
      id: string;
      createdAt: Date;
      updatedAt: Date;
      metadata?: {
        version: number;
        tags: string[];
      };
      owner?: {
        id: string;
        name: string;
      };
    }>();
  });

  test('should work with function properties', () => {
    interface EventHandler {
      name: string;
      handler?: (event: Event) => void;
      options?: EventListenerOptions;
      cleanup?: () => void;
    }

    type HandlerWithRequiredCallback = TNonNullablePick<EventHandler, 'handler'>;

    expectTypeOf<HandlerWithRequiredCallback>().toEqualTypeOf<{
      name: string;
      handler: (event: Event) => void;
      options?: EventListenerOptions;
      cleanup?: () => void;
    }>();
  });

  test('should handle union types in optional properties', () => {
    interface FlexibleConfig {
      mode: 'dev' | 'prod';
      debug?: boolean;
      apiUrl?: string | URL;
      timeout?: number | null;
    }

    type ConfigWithRequiredApi = TNonNullablePick<FlexibleConfig, 'apiUrl'>;

    expectTypeOf<ConfigWithRequiredApi>().toEqualTypeOf<{
      mode: 'dev' | 'prod';
      debug?: boolean;
      apiUrl: string | URL;
      timeout?: number | null;
    }>();
  });

  test('should work when all properties are optional', () => {
    interface AllOptional {
      a?: string;
      b?: number;
      c?: boolean;
    }

    type SomeRequired = TNonNullablePick<AllOptional, 'a' | 'b'>;

    expectTypeOf<SomeRequired>().toEqualTypeOf<{
      a: string;
      b: number;
      c?: boolean;
    }>();
  });
});
