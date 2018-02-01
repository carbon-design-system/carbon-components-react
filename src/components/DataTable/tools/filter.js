import { getCellId } from './cells';

export const defaultFilterRows = ({ rowIds, headers, cellsById, inputValue }) =>
  rowIds.filter(rowId =>
    headers.some(({ key }) => {
      const id = getCellId(rowId, key);
      return ('' + cellsById[id].value).includes(inputValue);
    })
  );
