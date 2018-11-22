
import React from 'react';
import { AppRegistry } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import Reducer from './Components/Reducer.js';
import { name as appName } from './app.json';

const store = createStore(Reducer);

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => RNRedux);
