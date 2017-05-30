/**
 * Shallow compare two arrays for equality
 * @param {array} arr1 the first array
 * @param {array} arr2 the second array
 * @returns {boolean} true if both arrays have the same contents, otherwise false
 */
export function equals(arr1, arr2) {
  if (
    !Array.isArray(arr1) ||
    !Array.isArray(arr2) ||
    arr1.length !== arr2.length
  ) {
    return false;
  }
  if (arr1 === arr2) {
    return true;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

/**
 * Splits an array into two arrays based on a predicate
 * @param {array} array the array
 * @param {function} predicate the method that makes the check
 * @returns {array} [pass, fail] Returns an array with two arrays which contain the results of the predicate
 */
export function distill(array, predicate) {
  const pass = [];
  const fail = [];

  array.forEach(item => {
    if (predicate(item)) pass.push(item);
    else fail.push(item);
  });

  return [pass, fail];
}
