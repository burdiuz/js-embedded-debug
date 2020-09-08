import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import MainView from './components/MainView';
import './App.css';

import {
  factory as communicationServiceFactory,
  getServiceInstance,
} from './communication';
import createCommandDispatcher from './message/converter';

communicationServiceFactory({ messagePort: window });
getServiceInstance().initialize(
  createCommandDispatcher((action) => store.dispatch(action)),
);

const App = () => {
  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  );
};

export default App;
