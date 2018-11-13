/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import SmsListener from 'react-native-android-sms-listener';
import { PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

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
    this.state = { mes: 2 };
  }

  componentDidMount() {
    requestReadSmsPermission();

    const { dirs } = RNFetchBlob.fs;

    RNFetchBlob.fs
      .mkdir(`${dirs.DownloadDir}/../testFsBlob`)
      .then(console.log('dir created'))
      .catch(err => {
        this.setState({ mes: err.toString() });
      });

    this.SMSReadSubscription = SmsListener.addListener(message => {
      console.log('Message:', message);
      this.setState({ mes: message.originatingAddress });
      const reg = new RegExp('\\d+');
      const matches = message.body.match(reg);
      this.setState({ mes: `from : ${message.originatingAddress}Nums : ${matches}` });
    });

    this.timer = setInterval(() => {
      console.log('I do not leak!');
      this.CreateFile();
    }, 1000);
  }

  componentWillUnmount() {
    // remove listener
    this.SMSReadSubscription.remove();
    clearInterval(this.timer);
  }

  CreateFile = () => {
    const { dirs } = RNFetchBlob.fs;
    RNFetchBlob.fs
      .appendFile(`${dirs.DownloadDir}/../testFsBlob.txt`, 'foo', 'utf8')
      .then(console.log('file created'))
      .catch(err => {
        this.setState({ mes: err.toString() });
      });
  };

  RunAt10am = () => {
    const now = new Date();
    let millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
    if (millisTill10 < 0) {
      millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
    }
    setTimeout(() => {
      alert("It's 10am!");
    }, millisTill10);
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.componentDidMount}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>{this.state.mes}</Text>
        <Text style={styles.instructions}>{instructions}</Text>
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
