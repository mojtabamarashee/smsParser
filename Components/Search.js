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
  constructor(props) {
    super(props);
    this.state = { showCal: false, date: 'init' };
    this.SetDate = this.SetDate.bind(this);
    this.SetDate1 = this.SetDate1.bind(this);
  }

  SetDate(date) {
    this.setState({ showCal: false });
	  date1 = date.format('jYY/jMM/jDD');
    this.setState({date:date1.toString()});
  }

  SetDate1() {
    this.setState({ showCal: true });
  }
  render() {
    return this.state.showCal ? (
      <View lightTheme>
        <PersianCalendarPicker allowRangeSelection={false} onDateChange={this.SetDate} />
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
    ) : (
      <Button
        onPress={this.SetDate1}
        title={this.state.date.toString()}
        color="#841584"
        accessibilityLabel="Lear more about this purple button"
      />
    );
  }
}
