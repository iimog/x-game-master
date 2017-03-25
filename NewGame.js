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

export class NewGameScreen extends Component {
  static navigationOptions = {
    title: "New Game",
  };
  render() {
    return (
      <Text style={ styles.title }>
        Start new game
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    color: 'blue',
    fontSize: 22
  },
});
