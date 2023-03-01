function isError(err: unknown): Error | undefined;
function isError(err: unknown, defaultValue: Error): Error;
function isError(err?: unknown, defaultValue?: Error): Error | undefined {
  if (err instanceof Error) {
    return err;
  }

  if (
    err !== undefined &&
    err !== null &&
    typeof err === 'object' &&
    'message' in err &&
    'stack' in err
  ) {
    return err as Error;
  }

  if (defaultValue != null) {
    return defaultValue;
  }

  return undefined;
}

export default isError;
