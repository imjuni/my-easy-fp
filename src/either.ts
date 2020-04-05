export interface IFail<ERR = Error> {
  readonly __tag: 'fail';
  readonly fail: ERR;
}

export interface IPass<DATA> {
  readonly __tag: 'pass';
  readonly pass: DATA;
}

export type Either<DATA, ERR = Error> = IFail<ERR> | IPass<DATA>;

export function efail<DATA = never, ERR = never>(e: ERR): Either<DATA, ERR> {
  return { __tag: 'fail', fail: e };
}

export function epass<DATA = never, ERR = never>(a: DATA): Either<DATA, ERR> {
  return { __tag: 'pass', pass: a };
}

export function isFail<DATA = never, ERR = never>(either: Either<DATA, ERR>): either is IFail<ERR> {
  return either.__tag === 'fail';
}

export function isPass<DATA = never, ERR = never>(either: Either<DATA, ERR>): either is IPass<DATA> {
  return either.__tag === 'pass';
}
