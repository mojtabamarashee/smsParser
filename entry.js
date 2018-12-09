import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { name as appName } from './app.json';

class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      selectedIndex: 2,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  render() {
    const buttons = ['Hello', 'World', 'Buttons'];
    const { selectedIndex } = this.state;

    return (
        <View>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 100 }}
        />
        </View>
    );
  }
}

//const store = createStore(Reducer);
//console.disableYellowBox = true;
//const AppNavigator = createBottomTabNavigator(
//  {
//    SMS: {
//      screen: App,
//    },
//    Search: {
//      screen: Search,
//    },
//  },
//  {
//    tabBarOptions: {
//      activeTintColor: '#0000ff',
//      activeBackgroundColor: '#88aaff',
//      showIcont: false,
//      labelStyle: {
//        fontSize: 20,
//        padding: 0,
//        borderColor: '#0000ff',
//      },
//      tabStyle: {
//        borderColor: '#0000ff',
//      },
//      style: {
//        backgroundColor: '#ffffff',
//        borderColor: '#0000ff',
//      },
//    },
//  }
//);
//
//const AppNavigator2 = createMaterialBottomTabNavigator(
//  {
//    App: { screen: App },
//    Search: { screen: Search },
//  },
//  {
//    initialRouteName: 'App',
//	  showIcont: false,
//    activeColor: '#f0edf6',
//    inactiveColor: '#3e2465',
//    barStyle: { backgroundColor: '#694fad' },
//  }
//);

AppRegistry.registerComponent(appName, () => App);

if (window.document) {
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('react-root'),
  });
}
