import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reduceReducers from 'reduce-reducers';
import reducer, { saveButtonStateReducer } from './reducer';

const initialRows = [
  {
    id: 'a',
    protocol: 'all',
    source: {
      type: 'any',
    },
    port_range: {
      type: 'any',
    },
  },
  {
    id: 'b',
    protocol: 'tcp',
    source: {
      type: 'cidr_block',
      value: '0.0.0.0/24',
    },
    port_range: {
      type: 'limit',
      range: [80, 8080],
    },
  },
  {
    id: 'c',
    protocol: 'udp',
    source: {
      type: 'security_group',
      value: 'eaque_est',
    },
    port_range: {
      type: 'any',
    },
  },
];

const middlewares = [thunkMiddleware, loggerMiddleware];
const store = createStore(
  reduceReducers(reducer, saveButtonStateReducer, {
    rows: initialRows,
    savedRows: initialRows,
  }),
  applyMiddleware(...middlewares)
);

export default store;
