/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { connect } from 'react-redux'
import { actionCreators } from '../../redux'
import Button from '../../components/Button';
import Input from '../../components/Input';
import PlayerList from '../../components/PlayerList';
import I18n from '../../i18n'

const mapStateToProps = (state) => ({players: state.players})

class PlayerSelect extends Component {
  static navigationOptions = {
    title: I18n.t('newGame'),
  };

  onAddPlayer = (text: string) => {
    const {players} = this.props
    if(players.indexOf(text) > -1){
      Alert.alert( 'Info', I18n.t("playerExists", {name: text}), [ {text: 'OK', onPress: () => {}} ], { cancelable: true } )
    } else  {
      const {dispatch} = this.props
      dispatch(actionCreators.addPlayer(text))
    }
  }

  onRemovePlayer = (index: number) => {
    const {dispatch} = this.props
    dispatch(actionCreators.removePlayer(index))
  }

  render() {
    const {players} = this.props
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

export default connect(mapStateToProps)(PlayerSelect)
