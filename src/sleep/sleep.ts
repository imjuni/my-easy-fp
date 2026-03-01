/**
 * sleep millisecond
 *
 * @param ms sleep time. That use millisecond
 */
export default async function sleep(ms = 1000): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(undefined), ms);
  });
}
