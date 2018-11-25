import React from 'react';
import { AppRegistry, Text } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import Search from './Components/Search';
import Reducer from './Components/Reducer.js';
import { name as appName } from './app.json';
import { StackNavigator, TabNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

const store = createStore(Reducer);

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: App
  },
  Home2: {
    screen: Search
  }
});

const App2 = createAppContainer(AppNavigator);
export default RNRedux = () => (
  <Provider store={store}>
    <App2 />
  </Provider>
);
AppRegistry.registerComponent(appName, () => RNRedux);
