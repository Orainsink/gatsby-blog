/**
 * Return a random value in a specified range
 * @method random
 * @param {Number} [low] Lowest value possible
 * @param {Number} [high] Highest value possible
 * @param {Boolean} [round=false] Floor the value?
 * @return {Number} Random value
 */
export const random = (
  low: number,
  high: number,
  round: boolean = false
): number => {
  round = round || false;

  let randomValue = Math.random() * (high - low) + low;

  if (round) {
    return Math.floor(randomValue);
  }

  return randomValue;
};

/**
 * generate array
 * @method arr
 * @param length
 * @return undefined[]
 */
export const arr = (length: number): undefined[] => {
  return new Array(length).fill(undefined);
};
