function isError<E extends Error = Error>(err: unknown): err is E;
function isError<E extends Error = Error>(err: unknown, defaultValue: E): E;
function isError<E extends Error = Error>(err?: unknown, defaultValue?: E): E | undefined {
  if (err instanceof Error) {
    return err as E;
  }

  if (
    err !== undefined &&
    err !== null &&
    typeof err === 'object' &&
    'name' in err &&
    'message' in err &&
    'stack' in err
  ) {
    return err as E;
  }

  if (defaultValue != null) {
    return defaultValue;
  }

  return undefined;
}

export default isError;
