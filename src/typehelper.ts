export type TResolvePromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
export type TResolveArray<T> = T extends (infer U)[] ? U : T;
export type TNullablePick<T, K extends keyof T> = Omit<T, K> & Pick<Partial<T>, K>;
