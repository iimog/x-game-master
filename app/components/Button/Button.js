/* @flow */

import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text
} from 'react-native';
import styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome'

export default class Button extends Component {
  render() {
    let icon: ?FontAwesome = null
    if(this.props.icon !== null){
      icon = <FontAwesome>{Icons[this.props.icon]}</FontAwesome>
    }
    return (
      <TouchableHighlight onPress={this.props.onPress} style={styles.button}>
        <Text style={styles.text}>{icon}{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}
