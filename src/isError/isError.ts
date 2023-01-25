export default function isError(
  err?: unknown,
  defaultValue?: Error,
): typeof defaultValue extends Error ? Error : Error | undefined {
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

  if (defaultValue !== undefined && defaultValue !== null) {
    return defaultValue;
  }

  return undefined;
}
