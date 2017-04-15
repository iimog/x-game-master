/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import MyButton from '../../../MyButton';
import images from '../../config/images';
import styles from './styles'

export class Home extends Component {
  static navigationOptions = {
    header: {visible: false},
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image source={images.logo} style={styles.logo}/>
        <View style={styles.buttons}>
          <MyButton text="New Game" onPress={() => navigate("NewGame")}></MyButton>
          <MyButton text="Continue Game" onPress={() => console.log("Continue Game button pressed!")}></MyButton>
          <MyButton text="Settings" onPress={() => console.log("Settings button pressed!")}></MyButton>
        </View>
      </View>
    );
  }
};
