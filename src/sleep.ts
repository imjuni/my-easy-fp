/**
 * sleep millisecond
 *
 * @param ms sleep time. That use millisecond
 */
export async function sleep(ms: number = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}
