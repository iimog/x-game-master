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
    borderRadius: 5
  },
  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  },
});
