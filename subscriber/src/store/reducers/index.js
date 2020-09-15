import { combineReducers } from 'redux';
import { createReducers } from '@actualwave/redux-create-reducer';

import * as console from './console';
import * as cookies from './cookies';
import * as localStorage from './local-storage';
import * as sessionStorage from './session-storage';
import * as xhr from './xhr';
import * as redux from './redux';
import * as location from './location';
import * as websockets from './websockets';
import * as domelement from './domelement';
import * as pixelperfect from './pixel-perfect';

const reducer = combineReducers(
  createReducers({
    console,
    cookies,
    localStorage,
    sessionStorage,
    xhr,
    redux,
    location,
    websockets,
    domelement,
    pixelperfect,
  }),
);

export default reducer;
