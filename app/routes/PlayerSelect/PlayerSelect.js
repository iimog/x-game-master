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
import I18n from '../../i18n'

export class PlayerSelect extends Component {
  static navigationOptions = {
    title: I18n.t('newGame'),
  };
  state = {
    players: ['Hannah', 'Markus', 'Tobi', 'Lo', 'Moritz'],
  };

  onAddPlayer = (text: string) => {
    const {players} = this.state
    if(players.indexOf(text) > -1){
      Alert.alert( 'Info', I18n.t("playerExists", {name: text}), [ {text: 'OK', onPress: () => {}} ], { cancelable: true } )
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
          placeholder={I18n.t('addPlayers')+'... '+I18n.t('removePlayer')}
        />
        <PlayerList
          list={players}
          onPressItem={this.onRemovePlayer}
        />
        <Button
          text={I18n.t('teamSelect')}
          onPress={()=>navigate('Team', {players: players})}
        />
      </ScrollView>
    );
  }
};
