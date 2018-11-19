import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';
import { ListItem,Icon } from 'react-native-elements';

export default class Row extends React.PureComponent {
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
      },
      title: {
        fontSize: 16,
        color: '#000',
      },
      container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
      },
      description: {
        fontSize: 11,
        fontStyle: 'italic',
      },
      photo: {
        height: 50,
        width: 50,
      },
    });

    const textColor = this.props.selected ? 'red' : 'red';
    const { title } = this.props;
	onPress =()=> {console.log("sfs")}
    return (
        <View style={styles.container_text}>
		<ListItem   onPress = {onPress()} Icon = {{}} title={'s'} subtitle={title} />
        </View>
    );
  }
}
