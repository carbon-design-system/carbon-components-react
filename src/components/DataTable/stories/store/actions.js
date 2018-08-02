export const SET_EDIT_MODE = 'SET_EDIT_MODE';
export const CANCEL_EDIT = 'CANCEL_EDIT';
export const ADD_RULE = 'ADD_RULE';
export const DELETE_RULE = 'DELETE_RULE';
export const SET_REQUEST_SAVE_IN_PROGRESS = 'SET_REQUEST_SAVE_IN_PROGRESS';
export const SET_REQUEST_SAVE_COMPLETE = 'SET_REQUEST_SAVE_COMPLETE';
export const UPDATE_PROTOCOL = 'UPDATE_PROTOCOL';
export const UPDATE_ENDPOINT_GROUP_TYPE = 'UPDATE_ENDPOINT_GROUP_TYPE';
export const UPDATE_ENDPOINT_GROUP_VALUE = 'UPDATE_ENDPOINT_GROUP_VALUE';
export const UPDATE_PORT_TYPE = 'UPDATE_PORT_TYPE';
export const UPDATE_PORT_FROM = 'UPDATE_PORT_FROM';
export const UPDATE_PORT_TO = 'UPDATE_PORT_TO';

export const setEditMode = editMode => ({ type: SET_EDIT_MODE, editMode });
export const cancelEdit = () => ({ type: CANCEL_EDIT });
export const addRule = () => ({ type: ADD_RULE });
export const deleteRule = rowId => ({ type: DELETE_RULE, rowId });

const setRequestSaveInProgress = isInProgress => ({
  type: SET_REQUEST_SAVE_IN_PROGRESS,
  isInProgress,
});

const setRequestSaveComplete = () => ({ type: SET_REQUEST_SAVE_COMPLETE });

export const saveData = () => dispatch => {
  dispatch(setRequestSaveInProgress(true));
  setTimeout(() => {
    dispatch(setRequestSaveComplete());
    setTimeout(() => {
      // NOTE: Not resetting `saving`/`saved` right now
      // as it interferes with the animation of batch action bar.
      // Resetting `saving`/`saved` happens when user goes back to edit mode.
      dispatch(setEditMode(false));
    }, 500);
  }, 2000);
};

export const changeCell = (rowId, field, value) => {
  const action = {
    protocol: UPDATE_PROTOCOL,
    'endpoint-group-type': UPDATE_ENDPOINT_GROUP_TYPE,
    'endpoint-group-value': UPDATE_ENDPOINT_GROUP_VALUE,
    'port-range-type': UPDATE_PORT_TYPE,
    'port-range-value-from': UPDATE_PORT_FROM,
    'port-range-value-to': UPDATE_PORT_TO,
  }[field];
  const numberValueActions = {
    'port-range-value-from': 1,
    'port-range-value-to': 1,
  };
  if (!action) {
    throw new Error(`Cannot find the action for the given field: ${field}`);
  }
  return {
    type: action,
    rowId,
    value: value === '' || !numberValueActions[field] ? value : Number(value),
  };
};
