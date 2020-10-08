import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';
import MainView from './components/MainView';
import './App.css';

import {
  factory as communicationServiceFactory,
  getServiceInstance,
} from './communication';
import createCommandDispatcher from './message/converter';

communicationServiceFactory({
  messagePort: { source: window, target: window.opener || window.top },
});

getServiceInstance().initialize(
  createCommandDispatcher((action) => store.dispatch(action)),
);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainView />
      </PersistGate>
    </Provider>
  );
};

export default App;
