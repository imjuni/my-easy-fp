/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export default function getRandomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
