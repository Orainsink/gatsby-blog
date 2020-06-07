/**
 * Return a random value in a specified range
 *
 * @method random
 * @param {Number} [low] Lowest value possible
 * @param {Number} [high] Highest value possible
 * @param {Boolean} [round=false] Floor the value?
 * @return {Number} Random value
 */

const random = (low: number, high: number, round?: boolean) => {
  round = round || false;

  let randomValue = Math.random() * (high - low) + low;

  if (round) {
    return Math.floor(randomValue);
  }

  return randomValue;
};

export default random;
