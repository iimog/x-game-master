/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';
import { connect } from 'react-redux'
import { actionCreators, PlayMode } from '../../redux'
import Button from '../../components/Button';
import TeamList from '../../components/TeamList';
import styles from './styles';
import I18n from '../../i18n'
import { shuffleTeams } from '../../lib'
import layout from '../../layouts'

const mapStateToProps = (store) => ({players: store.players, teams: store.teams, matchSettings: store.matchSettings})

class TeamSelect extends Component {
  static navigationOptions = {
    title: I18n.t('teams'),
  };

  render() {
    const { navigate } = this.props.navigation;
    const { players, teams } = this.props;
    return (
      <View style={layout.main}>
        <ScrollView style={layout.content}>
          <TeamList
            title={I18n.t('team1')}
            list={teams[0].map(i => players[i])}
            color="skyblue"
          />
          <TeamList
            title={I18n.t('team2')}
            list={teams[1].map(i => players[i])}
            color="red"
          />
        </ScrollView>
        <View style={styles.buttons}>
          <Button onPress={()=>{this.props.dispatch(actionCreators.setTeams(shuffleTeams(teams)))}} text={I18n.t('shuffle')}/>
          <Button onPress={()=>{
              navigate('Score')
          }} text={I18n.t('start')}/>
        </View>
      </View>
    );
  }
};

export default connect(mapStateToProps)(TeamSelect)
