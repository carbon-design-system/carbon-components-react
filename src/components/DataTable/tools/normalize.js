import { getCellId } from './cells';

/**
 * Normalize a collection of rows with the given headers.
 *
 * @param {Array[Object]} rows
 * @param {String} rows[0].id
 * @param {Array[Object]} headers
 * @param {String} headers[0].key
 * @param {String} headers[0].header
 * @returns {Object}
 */
const normalize = (rows, headers) => {
  const rowIds = new Array(rows.length);
  const rowsById = {};
  const cellsById = {};

  rows.forEach((row, i) => {
    rowIds[i] = row.id;
    // Initialize the row info and state values, namely for selection and
    // expansion
    rowsById[row.id] = {
      id: row.id,
      isSelectable: false,
      isSelected: false,
      isExpandable: null,
      isExpanded: false,
      cells: new Array(headers.length),
    };

    headers.forEach(({ key }, i) => {
      const id = getCellId(row.id, key);
      // Initialize the cell info and state values, namely for editing
      cellsById[id] = {
        id,
        value: row[key],
        isEditable: false,
        isEditing: false,
        isValid: true,
        errors: null,
      };

      rowsById[row.id].cells[i] = id;
    });
  });

  return {
    rowIds,
    rowsById,
    cellsById,
  };
};

export default normalize;
