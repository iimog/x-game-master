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

export class MainScreen extends Component {
  static navigationOptions = {
    header: {visible: false},
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image source={require('./img/X.png')} style={styles.logo}/>
        <View style={styles.buttons}>
          <MyButton text="New Game" onPress={() => navigate("NewGame")}></MyButton>
          <MyButton text="Continue Game" onPress={() => console.log("Continue Game button pressed!")}></MyButton>
          <MyButton text="Settings" onPress={() => console.log("Settings button pressed!")}></MyButton>
        </View>
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