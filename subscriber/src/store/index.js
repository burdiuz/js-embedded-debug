import { createStore, applyMiddleware } from 'redux';
import sideEffectMiddleware from '@actualwave/redux-side-effect';

const store = createStore(
  (state = {}) => state,
  applyMiddleware(sideEffectMiddleware)
);

export default store;
