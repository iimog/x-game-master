/**
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import MyButton from './MyButton';

export class TeamScreen extends Component {
  static navigationOptions = {
    title: "Teams",
  };
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Image source={require('./img/X.png')} style={styles.logo}/>
        <Text>
          { params.players.toString() }
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#414141',
  },
  logo: {
    width: 150,
    height: 121,
    margin: 20
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
});
