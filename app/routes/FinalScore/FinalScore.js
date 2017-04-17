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
import Button from '../../components/Button';
import styles from './styles'
import I18n from '../../i18n'

type myProps = {
  navigation: {
    navigate: any,
    state: {
      params: {
        score: Array<number>,
      }
    }
  },
  players: Array<string>,
  teams: [Array<number>,Array<number>]
}

const mapStateToProps = (store) => ({players: store.players, teams: store.teams})

class FinalScore extends Component {
  static navigationOptions = {
    header: {visible: false},
  };
  props: myProps;
  state: {
    teams: Array<Array<string>>,
    score: Array<number>
  }
  constructor(props: myProps) {
    super(props)
    const {score} = props.navigation.state.params;
    const {players, teams} = props
    const teamNames = teams.map((a) => a.map((e) => players[e]))
    this.state = {
      teams: teamNames,
      score: score
    }
  }

  render() {
    const { teams, score } = this.state
    const { navigate } = this.props.navigation
    let standing = [0,0];
    for(let i=0; i<score.length; i++){
      standing[score[i]] += (i+1)
    }
    return (
      <View>
        <Text style={styles.text}>
          {I18n.t('winnerIs')}: Team {score[score.length-1] === 0 ? I18n.t('team1') : I18n.t('team2')}!{"\n"}
          {I18n.t('finalScore')}: {standing[0]} - {standing[1]} {I18n.t('after')} {score.length} {I18n.t('rounds')}.{"\n"}
          {I18n.t('congratulations')}: {teams[score[score.length-1]].join(', ')}.{"\n"}
          {I18n.t('moreLuck')}: {teams[1-score[score.length-1]].join(', ')}
        </Text>
        <Button
          text={I18n.t('backToMain')}
          onPress={() => navigate('Home')}
        />
      </View>
    )
  }
};

export default connect(mapStateToProps)(FinalScore)
