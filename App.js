/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */
/* eslint no-unused-vars: 1 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
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
import SmsListener from 'react-native-android-sms-listener';
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import SmsAndroid from 'react-native-get-sms-android';
import { List, ListItem, SearchBar } from 'react-native-elements';
import Row from './Components/Row.js';
import Search from './Components/Search.js';
import { UPDATE_LIST } from './Components/Actions.js';
import Icon from 'react-native-vector-icons/FontAwesome';
const PersianCalendarPicker = require('react-native-persian-calendar-picker');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

type Props = {};

async function requestReadSmsPermission() {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS, {
      title: 'Auto Verification OTP',
      message: 'need access to read sms, to verify OTP',
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('sms read permissions granted', granted);
    } else {
      console.log('sms read permissions denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.SMSReadSubscription = {};
    this.state = { refreshing: false, loading: false, count: 0 };
    this.arrayholder = [];
  }

  componentDidMount() {
    requestReadSmsPermission();
    const { dispatch } = this.props;

    const { dirs } = RNFetchBlob.fs;

    RNFetchBlob.fs
      .mkdir(`${dirs.DownloadDir}/../testFsBlob`)
      .then(console.log('dir created'))
      .catch(err => {});

    this.SMSReadSubscription = SmsListener.addListener(message => {
      console.log('Message:', message);
      const reg = new RegExp('\\d+');
      const matches = message.body.match(reg);
    });

    this.timer = setInterval(() => {
      // console.log('I do not leak!');
      // this.CreateFile();
    }, 1000000);

    this.GetSms();
  }

  componentWillUnmount() {
    // remove listener
    this.SMSReadSubscription.remove();
    clearInterval(this.timer);
  }

  AppendFile = data => {
    const { dirs } = RNFetchBlob.fs;
    RNFetchBlob.fs
      .appendFile(`${dirs.DownloadDir}/../testFsBlob.txt`, data, 'utf8')
      .then(console.log('file append'))
      .catch(err => {
        console.log(err);
        // this.setState({ mes: err.toString() });
      });
  };

  RunAt10am = () => {
    const now = new Date();
    let millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
    if (millisTill10 < 0) {
      millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
    }
    setTimeout(() => {
      Alert.alert("It's 10am!");
    }, millisTill10);
  };

  handleRefresh() {
    // this.setState({ smsList: [] });
    dispatch({ type: UPDATE_LIST, data: [] });
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.GetSms();
      }
    );
  }

  onDateChange(date1) {
    Alert.alert(date1.unix().toString());
    // date1 = date1.format('jYY/jMM/jDD');
    // console.log("date1 = ", date1);
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 200,
          borderTopWidth: 10,
          borderColor: '#0000CE',
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  GetSms = () => {
    const { dispatch } = this.props;
    this.setState({ loading: true });
    const filter = {
      box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
      // the next 4 filters should NOT be used together, they are OR-ed so pick one
      // read: 0, // 0 for unread SMS, 1 for SMS already read
      // _id: 1234, // specify the msg id
      // address: '+1888------', // sender's phone number
      // body: 'How are you', // content to match
      // the next 2 filters can be used for pagination
      // indexFrom: 0, // start from index 0
      // ismaxCount: 10, // count of SMS to return each time
    };

    const { list } = this.props;
    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log(`Failed with this error: ${fail}`);
      },
      (count, sms) => {
        const arr = JSON.parse(sms);
        let myList = [];
        arr.forEach(object => {
          myList = [...myList, object];
          // this.AppendFile(object.body);
          // console.log(object.body);
        });
        // this.setState({ smsList, count });
        dispatch({ type: UPDATE_LIST, list: myList });
        this.arrayholder = list;
      }
    );

    this.setState({ refreshing: false, loading: false });
  };

  renderHeader = () => (
    <Button
      icon={<Icon name="arrow-right" size={15} color="white" />}
      title="Inbox"
      loading
      loadingProps={{ size: 'large', color: 'rgba(111, 202, 186, 1)' }}
      titleStyle={{ fontWeight: '700' }}
      buttonStyle={{
        backgroundColor: 'rgba(92, 99,216, 1)',
        width: 300,
        height: 45,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 5,
      }}
      containerStyle={{ marginTop: 20 }}
    />
  );

  render() {
    const { list } = this.props;
    const refreshing = this.state.refreshing;
    // console.log("refreshing = ", refreshing);
    // Alert.alert(refreshing);
    const _renderItem = ({ item }) => <Row sms={item} count={this.state.count} />;
    const _keyExtractor = (item, index) => index;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.list}
          extraData={this.state}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} progressViewOffset={50} onRefresh={() => this.handleRefresh()} />
          }
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FC22',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const mapStateToProps = state => ({
  list: state.list,
});

export default connect(mapStateToProps)(App);
