import React from 'react';
import { AppRegistry, Text } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import Search from './Components/Search';
import Reducer from './Components/Reducer.js';
import { name as appName } from './app.json';
import {
  StackNavigator,
  TabNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';



const store = createStore(Reducer);
console.disableYellowBox = true;
const AppNavigator = createBottomTabNavigator(
  {
    SMS: {
      screen: App,
    },
    Search: {
      screen: Search,
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#0000ff',
      activeBackgroundColor: '#88aaff',
      showIcont: false,
      labelStyle: {
        fontSize: 20,
        padding: 0,
        borderColor: '#0000ff',
      },
      tabStyle: {
        borderColor: '#0000ff',
      },
      style: {
        backgroundColor: '#ffffff',
        borderColor: '#0000ff',
      },
    },
  }
);

const AppNavigator2 = createMaterialBottomTabNavigator(
  {
    App: { screen: App },
    Search: { screen: Search },
  },
  {
    initialRouteName: 'App',
	  showIcont: false,
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
  }
);

const App2 = createAppContainer(AppNavigator);
export default (RNRedux = () => (
  <Provider store={store}>
    <App2 />
  </Provider>
));
AppRegistry.registerComponent(appName, () => RNRedux);
