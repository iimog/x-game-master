/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import MyButton from './MyButton';

export default class xMobile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./img/X.png')} style={styles.logo}/>
        <View style={styles.buttons}>
          <MyButton text="New Game" onPress={() => console.log("New Game button pressed!")}></MyButton>
          <MyButton text="Continue Game" onPress={() => console.log("Continue Game button pressed!")}></MyButton>
          <MyButton text="Settings" onPress={() => console.log("Settings button pressed!")}></MyButton>
        </View>
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

AppRegistry.registerComponent('xMobile', () => xMobile);
