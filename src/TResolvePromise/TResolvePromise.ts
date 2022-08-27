type TResolvePromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

export default TResolvePromise;
