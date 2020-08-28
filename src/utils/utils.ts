/**
 * Set yoyo on a TweenLite tween
 * must be passed on onComplete and onReverseComplete
 * @method yoyo
 */
export function yoyo() {
  if (this.reversed()) {
    this.restart();
  } else {
    this.reverse();
  }
}

/**
 * Return a random value in a specified range
 * @method random
 * @param {Number} [low] Lowest value possible
 * @param {Number} [high] Highest value possible
 * @param {Boolean} [round=false] Floor the value?
 * @return {Number} Random value
 */
export function random(low, high, round = false) {
  round = round || false;

  let randomValue = Math.random() * (high - low) + low;

  if (round) {
    return Math.floor(randomValue);
  }

  return randomValue;
}

/**
 * generate array
 * @method arr
 * @param length
 * @return undefined[]
 */
export function arr(length: number): any[] {
  return new Array(length).fill(undefined);
}
