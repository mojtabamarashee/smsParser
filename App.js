/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Button } from 'react-native';
import SmsListener from 'react-native-android-sms-listener'
import { PermissionsAndroid } from "react-native";


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
async function requestReadSmsPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: "Auto Verification OTP",
        message: "need access to read sms, to verify OTP"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("sms read permissions granted", granted);
    } else {
      console.log("sms read permissions denied", denied);
    }
  } catch (err) {
    console.warn(err);
  }
}


export default class App extends Component<Props> {

	constructor(props) {
		super(props);
		this.SMSReadSubscription = {};
		this.state={mes:2};
	}


	componentDidMountt() {
		requestReadSmsPermission();
		console.log("sup dude");
		this.SMSReadSubscription = SmsListener.addListener(message => {
			console.log("Message:", message);
			this.setState({mes:message.body});
			//message.body will have the message.
			//message.originatingAddress will be the address.
		});
	}

  componentWillUnmount() {
    //remove listener
    this.SMSReadSubscription.remove();
  }





  render() {

    return (
      <View style={styles.container}>
		<Button
  onPress={this.componentDidMountt}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>

        <Text  style={styles.welcome}>Welcome to React Native!</Text>
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
    backgroundColor: '#F5FCFF',
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
