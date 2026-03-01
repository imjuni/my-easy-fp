// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TResolvePromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

export default TResolvePromise;
