import { getCellId } from './cells';
import { sortStates } from '../state/sorting';

/**
 * Compare two primitives to determine which comes first. Initially, this method
 * will try and figure out if both entries are the same type. If so, it will
 * apply the default sort algorithm for those types. Otherwise, it defaults to a
 * string conversion.
 *
 * @param {Number|String} a
 * @param {Number|String} b
 * @param {String} locale
 * @returns {Number}
 */
export const compare = (a, b, locale = 'en') => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  if (typeof a === 'string' && typeof b === 'string') {
    return compareStrings(a, b, locale);
  }

  return compareStrings('' + a, '' + b, locale);
};

/**
 * Use the built-in `localeCompare` function available on strings to compare two
 * srints.
 *
 * @param {String} a
 * @param {String} b
 * @param {String} locale
 * @returns {Number}
 */
export const compareStrings = (a, b, locale = 'en') => {
  return a.localeCompare(b, locale, { numeric: true });
};

/**
 * Default implementation of how we sort rows internally. The idea behind this
 * implementation is to use the given list of row ids to look up the cells in
 * the row by the given key. We then use the value of these cells and pipe them
 * into our local `compareStrings` method, including the locale where
 * appropriate.
 *
 * @param {Array[String]} rowIds array of all the row ids in the table
 * @param {Object} cellsById object containing a mapping of cell id to cell
 * @param {String} direction the sort direction used to determine the order the
 * comparison is called in
 * @param {String} key the header key that we use to lookup the cell
 * @param {String?} locale optional locale used in the comparison function
 * @returns {Array[String]} array of sorted rowIds
 */
export const defaultSortRows = ({
  rowIds,
  cellsById,
  direction,
  key,
  locale,
}) =>
  rowIds.slice().sort((a, b) => {
    const cellA = cellsById[getCellId(a, key)];
    const cellB = cellsById[getCellId(b, key)];
    if (direction === sortStates.DESC) {
      return compare(cellB.value, cellA.value, locale);
    }

    return compare(cellA.value, cellB.value, locale);
  });
