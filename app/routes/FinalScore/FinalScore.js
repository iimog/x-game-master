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
import layout from '../../layouts'
import { actionCreators } from '../../redux'

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
    header: null,
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
    const winningTeam = score[0] > score[1] ? 0 : 1
    return (
      <View style={layout.main}>
        <ScrollView style={layout.content}>
          <Text style={styles.text}>
            {I18n.t('winnerIs')}: Team {score[0] > score[1] ? I18n.t('team1') : I18n.t('team2')}!{"\n"}
            {I18n.t('finalScore')}: {score[0]} - {score[1]}.{"\n"}
            {I18n.t('congratulations')}: {teams[winningTeam].join(', ')}.{"\n"}
            {I18n.t('moreLuck')}: {teams[1-winningTeam].join(', ')}
          </Text>
        </ScrollView>
        <Button
          text={I18n.t('backToMain')}
          onPress={() => {
            this.props.dispatch(actionCreators.resetMatch())
            navigate('Home')
          }}
        />
      </View>
    )
  }
};

export default connect(mapStateToProps)(FinalScore)
