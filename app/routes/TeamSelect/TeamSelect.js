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

const mapStateToProps = (store) => ({players: store.players, teams: store.teams, matchSettings: store.matchSettings})

class TeamSelect extends Component {
  static navigationOptions = {
    title: I18n.t('teams'),
  };

  render() {
    const { navigate } = this.props.navigation;
    const { players, teams } = this.props;
    return (
      <ScrollView>
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
        <View style={styles.buttons}>
          <Button onPress={()=>{this.props.dispatch(actionCreators.setTeams(shuffleTeams(teams)))}} text={I18n.t('shuffle')}/>
          <Button onPress={()=>{
            if(this.props.matchSettings.playMode === PlayMode.CLASSIC){
              navigate('Score')
            } else {
              navigate('ClubScore')
            }
          }} text={I18n.t('start')}/>
        </View>
      </ScrollView>
    );
  }
};

export default connect(mapStateToProps)(TeamSelect)
