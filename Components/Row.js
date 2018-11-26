import React from 'react';
import { Platform, StyleSheet, Text, View, Alert, ScrollView, FlatList, Button, TouchableOpacity } from 'react-native';
import { ListItem, Icon, Divider, Card } from 'react-native-elements';
import Datee from 'persian-date';

export default class Row extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  onPress = () => {
    const { show } = this.state;
    this.setState({ show: !show });
    console.log(show);
  };

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
        color: 'black',
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
    const { title } = this.props.sms.body;
    const day = new Datee(this.props.sms.date).toLocale('en').format('YY/MM/DD');
    const read = this.props.sms._id;
    return !this.state.show ? (
      <View style={styles.container_text}>
        <ListItem
          titleStyle={{ color: 'blue', fontWeight: 'bold' }}
          subtitleStyle={{ color: 'black' }}
          onPress={this.onPress}
          Icon={{}}
          title={
            <View style={{ flexDirection: 'row', flex :1 }}>
              <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 18 }}>{this.props.sms.address}</Text>
              <Text style={{ color: 'green', float: 'right', marginLeft: 50 }}>{day}</Text>
            </View>
          }
          subtitle={this.props.sms.body}
        />
      </View>
    ) : (
      <Card dividerStyle={null} style={styles.container_text}>
        <TouchableOpacity onPress={this.onPress}>
          <View style={{ flexDirection: 'row' }} >
            <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 18 }}>{this.props.sms.address}</Text>
            <Text style={{ color: 'green', float: 'right', marginLeft: 50 }}>{day}</Text>
          </View>
          <View>
            <Text onPress={this.onPress}>{this.props.sms.body}</Text>
            <Divider style={{ backgroundColor: 'blue' }} />
          </View>
        </TouchableOpacity>
      </Card>
    );
  }
}
