import { describe, expectTypeOf, test } from 'vitest';

import type TNullablePick from './TNullablePick';

describe('TNullablePick type utility', () => {
  test('should make specified keys optional', () => {
    interface User {
      id: number;
      name: string;
      email: string;
      age: number;
    }

    type UserWithOptionalEmail = TNullablePick<User, 'email'>;

    expectTypeOf<UserWithOptionalEmail>().toEqualTypeOf<{
      id: number;
      name: string;
      email?: string;
      age: number;
    }>();

    // Should accept objects without the optional key
    expectTypeOf<{ id: 1; name: 'John'; age: 25 }>().toMatchTypeOf<UserWithOptionalEmail>();

    // Should accept objects with the optional key
    expectTypeOf<{
      id: 1;
      name: 'John';
      email: 'john@example.com';
      age: 25;
    }>().toMatchTypeOf<UserWithOptionalEmail>();
  });

  test('should make multiple keys optional', () => {
    interface Product {
      id: string;
      name: string;
      price: number;
      description: string;
      category: string;
    }

    type ProductWithOptionals = TNullablePick<Product, 'description' | 'category'>;

    expectTypeOf<ProductWithOptionals>().toEqualTypeOf<{
      id: string;
      name: string;
      price: number;
      description?: string;
      category?: string;
    }>();

    // Should accept objects with minimal required fields
    expectTypeOf<{ id: '1'; name: 'Product'; price: 100 }>().toMatchTypeOf<ProductWithOptionals>();

    // Should accept objects with some optional fields
    expectTypeOf<{
      id: '1';
      name: 'Product';
      price: 100;
      description: 'A product';
    }>().toMatchTypeOf<ProductWithOptionals>();
  });

  test('should work with already optional properties', () => {
    interface Config {
      host: string;
      port: number;
      ssl?: boolean;
      timeout?: number;
    }

    type ConfigWithOptionalPort = TNullablePick<Config, 'port'>;

    expectTypeOf<ConfigWithOptionalPort>().toEqualTypeOf<{
      host: string;
      port?: number;
      ssl?: boolean;
      timeout?: number;
    }>();
  });

  test('should preserve property types exactly', () => {
    interface ApiResponse {
      status: 'success' | 'error';
      data: Record<string, unknown>;
      message: string;
      timestamp: Date;
    }

    type ApiResponseWithOptionalMessage = TNullablePick<ApiResponse, 'message'>;

    expectTypeOf<ApiResponseWithOptionalMessage>().toEqualTypeOf<{
      status: 'success' | 'error';
      data: Record<string, unknown>;
      message?: string;
      timestamp: Date;
    }>();

    // Should preserve union types
    expectTypeOf<{
      status: 'success';
      data: object;
      timestamp: Date;
    }>().toMatchTypeOf<ApiResponseWithOptionalMessage>();
  });

  test('should work with complex nested types', () => {
    interface DatabaseEntity {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      metadata: {
        version: number;
        tags: string[];
      };
    }

    type EntityWithOptionalTimestamps = TNullablePick<DatabaseEntity, 'createdAt' | 'updatedAt'>;

    expectTypeOf<EntityWithOptionalTimestamps>().toEqualTypeOf<{
      id: string;
      createdAt?: Date;
      updatedAt?: Date;
      metadata: {
        version: number;
        tags: string[];
      };
    }>();
  });

  test('should work with function properties', () => {
    interface EventHandler {
      name: string;
      handler: (event: Event) => void;
      options: EventListenerOptions;
      cleanup: () => void;
    }

    type HandlerWithOptionalCleanup = TNullablePick<EventHandler, 'cleanup'>;

    expectTypeOf<HandlerWithOptionalCleanup>().toEqualTypeOf<{
      name: string;
      handler: (event: Event) => void;
      options: EventListenerOptions;
      cleanup?: () => void;
    }>();
  });

  test('should handle single key selection', () => {
    interface SimpleObject {
      a: string;
      b: number;
      c: boolean;
    }

    type WithOptionalA = TNullablePick<SimpleObject, 'a'>;

    expectTypeOf<WithOptionalA>().toEqualTypeOf<{
      a?: string;
      b: number;
      c: boolean;
    }>();
  });
});
