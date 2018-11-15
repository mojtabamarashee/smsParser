/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */
/* eslint no-unused-vars: 1 */
import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Alert, ScrollView,
} from 'react-native';
import { Button } from 'react-native';
import SmsListener from 'react-native-android-sms-listener';
import { PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import SmsAndroid from 'react-native-get-sms-android';
import { List, ListItem } from 'react-native-elements';

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

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.SMSReadSubscription = {};
    this.state = { smsList: [{ body: 'body', date: '1' }] };
  }

  componentDidMount() {
    requestReadSmsPermission();

    const { dirs } = RNFetchBlob.fs;

    RNFetchBlob.fs
      .mkdir(`${dirs.DownloadDir}/../testFsBlob`)
      .then(console.log('dir created'))
      .catch((err) => {
      });

    this.SMSReadSubscription = SmsListener.addListener((message) => {
      console.log('Message:', message);
      const reg = new RegExp('\\d+');
      const matches = message.body.match(reg);
    });

    this.timer = setInterval(() => {
      console.log('I do not leak!');
      // this.CreateFile();
    }, 1000);

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

    let { smsList } = this.state;
    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log(`Failed with this error: ${fail}`);
      },
      (count, sms) => {
        const arr = JSON.parse(sms);

        arr.forEach((object) => {
          smsList = [...smsList, { body: object.body, date: object.date }];
          this.AppendFile(object.body);
			//console.log(object.body);
        });
        this.setState({ smsList });
      },
    );
  }

  componentWillUnmount() {
    // remove listener
    this.SMSReadSubscription.remove();
    clearInterval(this.timer);
  }

  AppendFile = (data) => {
    const { dirs } = RNFetchBlob.fs;
    RNFetchBlob.fs
      .appendFile(`${dirs.DownloadDir}/../testFsBlob.txt`, data, 'utf8')
      .then(console.log('file append'))
      .catch((err) => {
        //console.log(err);
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
      Alert.alert('It\'s 10am!');
    }, millisTill10);
  };

  render() {
    const { smsList } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <List containerStyle={{ marginBottom: 20 }}>
            {smsList.map((l, i) => (
              <ListItem  title={l.body} />
            ))}
          </List>
        </ScrollView>
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
