/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PlayerList from '../../components/PlayerList';

export class PlayerSelect extends Component {
  static navigationOptions = {
    title: "New Game",
  };
  state = {
    players: ['Hannah', 'Markus', 'Tobi', 'Lo', 'Moritz'],
  };

  onAddPlayer = (text: string) => {
    const {players} = this.state
    if(players.indexOf(text) > -1){
      Alert.alert( 'Info', `Player ${text} already exists`, [ {text: 'OK', onPress: () => {}} ], { cancelable: true } )
    } else  {
      this.setState({
        players: [text, ...players],
      })
    }
  }

  onRemovePlayer = (index: number) => {
    const {players} = this.state

    this.setState({
      players: players.filter((player, i) => i !== index),
    })
  }

  render() {
    const {players} = this.state
    const { navigate } = this.props.navigation

    return (
      <ScrollView>
        <Input
          onSubmitEditing={this.onAddPlayer}
          placeholder='Add players... Remove by tapping on them.'
        />
        <PlayerList
          list={players}
          onPressItem={this.onRemovePlayer}
        />
        <Button
          text="Select Teams"
          onPress={()=>navigate('Team', {players: players})}
        />
      </ScrollView>
    );
  }
};
