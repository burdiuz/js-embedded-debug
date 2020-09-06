import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import sideEffectMiddleware from '@actualwave/redux-side-effect';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sideEffectMiddleware)),
);

export default store;
