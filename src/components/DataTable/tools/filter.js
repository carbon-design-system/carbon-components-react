import { getCellId } from './cells';

/**
 * Default implemention of how we filter rows internally. The idea behind this
 * implementation is to use the given list of row ids and headers to get the
 * individual cell values for a row. Then, we go through each cell value and see
 * if any of them includes the given inputValue.
 *
 * @param {Array<string>} rowIds array of all the row ids in the table
 * @param {Array<Object>} headers
 * @param {Object} cellsById object containing a map of cell id to cell
 * @param {string} inputValue the current input value in the Table Search
 * @returns {Array<string>} rowIds
 */
export const defaultFilterRows = ({ rowIds, headers, cellsById, inputValue }) =>
  rowIds.filter(rowId =>
    headers.some(({ key }) => {
      const id = getCellId(rowId, key);
      return ('' + cellsById[id].value)
        .toLowerCase()
        .includes(inputValue.toLowerCase());
    })
  );
