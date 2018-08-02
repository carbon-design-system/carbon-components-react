import {
  SET_EDIT_MODE,
  CANCEL_EDIT,
  ADD_RULE,
  DELETE_RULE,
  SET_REQUEST_SAVE_IN_PROGRESS,
  SET_REQUEST_SAVE_COMPLETE,
  UPDATE_PROTOCOL,
  UPDATE_ENDPOINT_GROUP_TYPE,
  UPDATE_ENDPOINT_GROUP_VALUE,
  UPDATE_PORT_TYPE,
  UPDATE_PORT_FROM,
  UPDATE_PORT_TO,
} from './actions';

const endpointGroupValueInvalidText = {
  ip_address: 'Wrong IP address',
  cidr_block: 'Wrong CIDR block',
};

const endpointGroupValueValidators = {
  ip_address: value => {
    if (!value) {
      return false;
    }
    const parts = value.split('.');
    if (parts.length !== 4) {
      return true;
    }
    return parts.some(part => {
      const value = Number(part);
      return !part || isNaN(value) || value < 0 || value > 256;
    });
  },
  cidr_block: value => {
    if (!value) {
      return false;
    }
    const parts = value.split('/');
    if (parts.length !== 2) {
      return true;
    }
    const mask = Number(parts[1]);
    return (
      !parts[1] ||
      isNaN(mask) ||
      mask < 0 ||
      mask > 32 ||
      endpointGroupValueValidators['ip_address'](parts[0])
    );
  },
};

const reducer = (state = {}, action) => {
  const { rows: oldRows } = state;
  const { rowId: oldRowId, value } = action;
  switch (action.type) {
    case SET_EDIT_MODE:
      return action.editMode
        ? {
            ...state,
            editing: true,
            saving: false,
            saved: false,
          }
        : {
            ...state,
            editing: false,
          };
    case CANCEL_EDIT:
      return {
        ...state,
        editing: false,
        rows: state.savedRows,
      };
    case ADD_RULE:
      return {
        ...state,
        rows: oldRows.concat({
          id: `__bx_example__rule_edit_table__row__${Math.random()
            .toString(36)
            .substr(2)}`,
          protocol: 'all',
          source: {
            type: 'any',
          },
          port_range: {
            type: 'any',
          },
        }),
      };
    case DELETE_RULE:
      return {
        ...state,
        rows: oldRows.filter(oldRow => oldRowId !== oldRow.id),
      };
    case SET_REQUEST_SAVE_IN_PROGRESS:
      return {
        ...state,
        saving: action.isInProgress,
      };
    case SET_REQUEST_SAVE_COMPLETE:
      return {
        ...state,
        saved: true,
        savedRows: oldRows,
      };
    case UPDATE_PROTOCOL:
      return {
        ...state,
        rows: oldRows.map(
          oldRow =>
            oldRowId !== oldRow.id
              ? oldRow
              : {
                  ...oldRow,
                  protocol: value,
                }
        ),
      };
    case UPDATE_ENDPOINT_GROUP_TYPE:
      return {
        ...state,
        rows: oldRows.map(
          oldRow =>
            oldRowId !== oldRow.id
              ? oldRow
              : {
                  ...oldRow,
                  source: {
                    ...oldRow.source,
                    type: value,
                  },
                }
        ),
      };
    case UPDATE_ENDPOINT_GROUP_VALUE:
      return {
        ...state,
        rows: oldRows.map(oldRow => {
          if (oldRowId !== oldRow.id) {
            return oldRow;
          }
          const { type } = oldRow.source;
          const validator = endpointGroupValueValidators[type];
          const invalid = validator && validator(value);
          return {
            ...oldRow,
            source: {
              ...oldRow.source,
              value,
              invalid,
              invalidText: invalid && endpointGroupValueInvalidText[type],
            },
          };
        }),
      };
    case UPDATE_PORT_TYPE:
      return {
        ...state,
        rows: oldRows.map(
          oldRow =>
            oldRowId !== oldRow.id
              ? oldRow
              : {
                  ...oldRow,
                  port_range: {
                    ...oldRow.port_range,
                    type: value,
                    range:
                      value !== 'limit'
                        ? undefined
                        : oldRow.port_range.range || [0, 65535],
                  },
                }
        ),
      };
    case UPDATE_PORT_FROM:
      return {
        ...state,
        rows: oldRows.map(oldRow => {
          if (oldRowId !== oldRow.id) {
            return oldRow;
          }
          const to = (oldRow.port_range.range || [])[1];
          const fromIsBigger = typeof to !== 'undefined' && to < value;
          const invalid = [
            value < 0 || value >= 65536 || fromIsBigger,
            (typeof to !== 'undefined' && (to < 0 || to >= 65536)) ||
              fromIsBigger,
          ];
          const invalidText = fromIsBigger
            ? 'From port should not be bigger than to port'
            : 'Port out of range';
          return {
            ...oldRow,
            port_range: {
              ...oldRow.port_range,
              range: [value, to],
              invalid,
              invalidText: [
                invalid[0] && invalidText,
                invalid[1] && invalidText,
              ],
            },
          };
        }),
      };
    case UPDATE_PORT_TO:
      return {
        ...state,
        rows: oldRows.map(oldRow => {
          if (oldRowId !== oldRow.id) {
            return oldRow;
          }
          const from = (oldRow.port_range.range || [])[0];
          const fromIsBigger = typeof from !== 'undefined' && from > value;
          const invalid = [
            (typeof from !== 'undefined' && (from < 0 || from >= 65536)) ||
              fromIsBigger,
            value < 0 || value >= 65536 || fromIsBigger,
          ];
          const invalidText = fromIsBigger
            ? 'From port should not be bigger than to port'
            : 'Port out of range';
          return {
            ...oldRow,
            port_range: {
              ...oldRow.port_range,
              range: [from, value],
              invalid,
              invalidText: [
                invalid[0] && invalidText,
                invalid[1] && invalidText,
              ],
            },
          };
        }),
      };
    default:
      return state;
  }
};

export const saveButtonStateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ENDPOINT_GROUP_VALUE:
    case UPDATE_PORT_FROM:
    case UPDATE_PORT_TO:
      return {
        ...state,
        shouldDisableSave: state.rows.some(
          row =>
            row.source.invalid || (row.port_range.invalid || []).some(Boolean)
        ),
      };
    default:
      return state;
  }
};

export default reducer;
