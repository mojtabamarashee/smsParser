/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from 'react-native';
import SmsListener from 'react-native-android-sms-listener';
import { PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import SmsAndroid  from 'react-native-get-sms-android';

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

	  this.setState({mes:'sa'});
    this.timer = setInterval(() => {
      console.log('I do not leak!');
      //this.CreateFile();
	//	this.setState({mes:'sa'});
    }, 1000);


	  var filter = {
    box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
    // the next 4 filters should NOT be used together, they are OR-ed so pick one
    //read: 0, // 0 for unread SMS, 1 for SMS already read
    //_id: 1234, // specify the msg id
    //address: '+1888------', // sender's phone number
    //body: 'How are you', // content to match
    // the next 2 filters can be used for pagination
    //indexFrom: 0, // start from index 0
    //ismaxCount: 10, // count of SMS to return each time
	  };

	  this.setState({mes:'sa'});
	  SmsAndroid.list(JSON.stringify(filter), (fail) => {
        console.log("Failed with this error: " + fail)
    },
    (count, smsList) => {
        console.log('Count: ', count);
        console.log('List: ', smsList);
        var arr = JSON.parse(smsList);
		this.setState({mes:smsList});

        arr.forEach((object)=>{
            console.log("-->" + object.date);
            console.log("-->" + object.body);
        })
    });




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
      Alert.alert("It's 10am!");
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
