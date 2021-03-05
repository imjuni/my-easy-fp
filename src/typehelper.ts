export type TResolvePromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
export type TResolveArray<T> = T extends (infer U)[] ? U : T;
