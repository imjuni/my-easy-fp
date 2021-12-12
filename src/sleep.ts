/**
 * sleep millisecond
 *
 * @param ms sleep time. That use millisecond
 */
// eslint-disable-next-line
export async function sleep(ms: number = 1000): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(undefined), ms);
  });
}
