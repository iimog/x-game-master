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
    players: ['Hannah', 'Markus', 'Tobi', 'Lo', 'Moritz'],
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
    const { navigate } = this.props.navigation

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
        <MyButton
          text="Start"
          onPress={()=>navigate('Team', {players: players})}
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
