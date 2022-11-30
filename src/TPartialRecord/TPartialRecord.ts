/**
 * PartialRecord: optional keys for TypeScript Record
 *
 * @see https://stackoverflow.com/questions/53276792/define-a-list-of-optional-keys-for-typescript-record
 */
type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export default PartialRecord;
