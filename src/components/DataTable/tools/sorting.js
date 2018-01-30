import { getCellId } from './cells';

/**
 * We currently support the following sorting states for DataTable headers,
 * namely: `NONE` for no sorting being applied, and then `DESC` and `ASC` for
 * the corresponding direction of the sorting order.
 */
export const sortStates = {
  NONE: 'NONE',
  DESC: 'DESC',
  ASC: 'ASC',
};

// Our initialSortState should be `NONE`, unless a consumer has specified a
// different initialSortState
export const initialSortState = sortStates.NONE;

/**
 * Utility used to get the next sort state given the following pieces of
 * information:
 *
 * @param {String} prevHeader the value of the previous header
 * @param {String} header the value of the currently selected header
 * @param {String} prevState the previous sort state of the table
 * @returns {String}
 */
export const getSortState = (prevHeader, header, prevState) => {
  // If the previous header is equivalent to the current header, we know that we
  // have to derive the next sort state from the previous sort state
  if (prevHeader === header) {
    // When transitioning, we know that the sequence of states is as follows:
    // NONE -> DESC -> ASC -> NONE
    if (prevState === 'NONE') {
      return sortStates.DESC;
    }
    if (prevState === 'DESC') {
      return sortStates.ASC;
    }
    return sortStates.NONE;
  }
  // Otherwise, we have selected a new header and need to start off by sorting
  // in descending order by default
  return sortStates.DESC;
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
  rowIds.sort((a, b) => {
    const cellA = cellsById[getCellId(a, key)];
    const cellB = cellsById[getCellId(b, key)];
    if (direction === sortStates.DESC) {
      return compareStrings(cellB.value, cellA.value, locale);
    }

    return compareStrings(cellA.value, cellB.value, locale);
  });
