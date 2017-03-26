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
import Input from './Input';
import List from './List';

export class NewGameScreen extends Component {
  static navigationOptions = {
    title: "New Game",
  };
  state = {
    players: ['Player1', 'Player2'],
  };

  onAddPlayer = (text) => {
    const {players} = this.state

    this.setState({
      players: [text, ...players],
    })
  }

  onRemovePlayer = (index) => {
    const {players} = this.state

    this.setState({
      players: players.filter((player, i) => i !== index),
    })
  }

  render() {
    const {players} = this.state

    return (
      <View>
        <Input
          onSubmitEditing={this.onAddPlayer}
          placeholder='Add players... Remove by tapping on them.'
        />
        <List
          list={players}
          onPressItem={this.onRemovePlayer}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    color: 'blue',
    fontSize: 22
  },
});
