import { getCellId } from './cells';

/**
 * Normalize a collection of rows with the given headers.
 *
 * @param {Array<Object>} rows
 * @param {Array<Object>} headers
 * @returns {Object}
 */
const normalize = (rows, headers, prevState = {}) => {
  const { cellsById: prevCellsById, rowsById: prevRowsByIds } = prevState;
  const rowIds = new Array(rows.length);
  const rowsById = {};
  const cellsById = {};

  rows.forEach((row, i) => {
    rowIds[i] = row.id;
    // Initialize the row info and state values, namely for selection and
    // expansion
    rowsById[row.id] = {
      id: row.id,
      // TODO: remove and replace with codemod
      isSelected: false,
      isExpanded: false,
      state: {
        isSelected: false,
        isExpanded: false,
      },
      cells: new Array(headers.length),
    };

    // If we have a previous state, and the row existed in that previous state,
    // then we'll set the state values of the row to the previous state values.
    if (prevRowsByIds && prevRowsByIds[row.id] !== undefined) {
      rowsById[row.id].isSelected = prevRowsByIds[row.id].isSelected;
      rowsById[row.id].isExpanded = prevRowsByIds[row.id].isExpanded;

      rowsById[row.id].state = {
        ...prevRowsByIds[row.id].state,
      };
    }

    headers.forEach(({ key }, i) => {
      const id = getCellId(row.id, key);
      // Initialize the cell info and state values, namely for editing
      cellsById[id] = {
        id,
        value: row[key],

        // TODO remove these and place in state. Write codemod to help with
        // transition.
        // isEditable: false,
        isEditing: false,
        isValid: true,
        errors: null,

        info: {
          header: key,
          row: row.id,
        },
      };

      if (prevCellsById && prevCellsById[id]) {
        cellsById[id].state = {
          ...prevCellsById[id].state,
        };
      }

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
