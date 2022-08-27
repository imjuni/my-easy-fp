export default function isError(err?: unknown): Error | undefined {
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

  return undefined;
}
