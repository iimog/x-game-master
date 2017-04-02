/**
 * @flow
 */

import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native';

export default class MyButton extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} style={styles.button}>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkgrey',
    borderColor: '#333333',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10
  },
  text: {
    fontSize: 20,
    color: '#333333',
    textAlign: 'center',
    margin: 10,
  },
});
