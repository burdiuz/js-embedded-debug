import { combineReducers } from 'redux';
import { createReducers } from '@actualwave/redux-create-reducer';

import * as console from './console';
import * as cookies from './cookies';
import * as localStorage from './local-storage';
import * as sessionStorage from './session-storage';
import * as network from './network';

const reducer = combineReducers(
  createReducers({
    console,
    cookies,
    localStorage,
    sessionStorage,
    network,
  }),
);

export default reducer;
