import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import sideEffectMiddleware from '@actualwave/redux-side-effect';

import reducer from './reducers';
import './effects';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistReducer(
    {
      storage,
      key: '@EDConsole-Storage-root',
      whitelist: ['command'],
    },
    reducer,
  ),
  composeEnhancers(applyMiddleware(sideEffectMiddleware)),
);

export const persistor = persistStore(store);
