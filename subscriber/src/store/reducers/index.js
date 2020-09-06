import { combineReducers } from 'redux';
import { createReducers } from '@actualwave/redux-create-reducer';

import * as console from './console';
import * as cookie from './cookie';
import * as localStorage from './local-storage';
import * as sessionStorage from './session-storage';
import * as network from './network';

const reducer = combineReducers(
  createReducers({
    console,
    cookie,
    localStorage,
    sessionStorage,
    network,
  }),
);

export default reducer;
