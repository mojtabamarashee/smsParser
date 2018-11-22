import React, { Component } from 'react';

import {
  Text,
  View,
  Alert,
  ScrollView,
  FlatList,
  Button,
  PermissionsAndroid,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import SmsAndroid from 'react-native-get-sms-android';
import { List, ListItem, SearchBar } from 'react-native-elements';

const PersianCalendarPicker = require('react-native-persian-calendar-picker');

 
export default class Search extends Component {
  render() {
    return (
      <View lightTheme>
        <PersianCalendarPicker allowRangeSelection={true} onDateChange={this.onDateChange} />
        <SearchBar onChangeText={text => this.searchFilterFunction(text)} placeholder="Type Here..." lightTheme round />
        <Text
          style={{
            color: 'red',
            backgroundColor: 'black',
            fontWeight: 'bold',
            fontSize: 20,
            float: 'right',
            padding: 5,
          }}
        >
          total : {1}
        </Text>
      </View>
    );
  }
}
