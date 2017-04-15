/* @flow */

import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text
} from 'react-native';
import styles from './styles';

export default class Button extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} style={styles.button}>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}
