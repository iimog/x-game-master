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
import Button from '../../components/Button'
import ScoreBoard from '../../components/ScoreBoard'
import ProgressBoard from '../../components/ProgressBoard'
import styles from './styles'
import I18n from '../../i18n'
import defaultGame from '../Game/DefaultGame'
import type Game from '../Game/DefaultGame'
import _ from 'lodash'
import { getRandomGameID } from '../../lib'
import layout from '../../layouts'

const mapStateToProps = (state) => ({
  matchSettings: state.matchSettings,
  teamWin: state.teamWin,
  teams: state.teams,
  players: state.players,
  games: state.games,
  playedGames: state.playedGames,
})

type myProps = {
  navigation: {
    navigate: any
  },
  matchSettings: {
    numberOfGames: number,
    scoreIncreasing: boolean,
  },
  teamWin: Array<number>,
  teams: [Array<number>,Array<number>],
  players: Array<string>,
  games: {[string]: Game},
  playedGames: Array<string>,
  dispatch: any,
}

function getStanding(score: Array<number>, scoreIncreasing: boolean): [number, number]{
  let standing = [0,0];
  for(let i=0; i<score.length; i++){
    let step = scoreIncreasing ? (i+1) : 1
    standing[score[i]] += step
  }
  return standing
}

function isMatchOver(standing: [number, number], numberOfGames:number, scoreIncreasing: boolean): boolean{
  if(scoreIncreasing){
    if(Math.max(standing[0], standing[1])>((1+numberOfGames)*numberOfGames)/4){
      return true
    }
  } else {
    if(Math.max(standing[0], standing[1])>(numberOfGames/2)){
      return true
    }
  }
  return false
}

class Score extends Component {
  static navigationOptions = {
    header: {visible: false},
  };
  props: myProps;
  state: {
    score: Array<number>,
  }
  constructor(props: myProps) {
    super(props)
    this.state = {
      score: props.teamWin
    }
  }

  render() {
    const { score } = this.state
    const { navigate } = this.props.navigation
    const { matchSettings } = this.props
    let standing = getStanding(score, matchSettings.scoreIncreasing)
    let matchOver = isMatchOver(standing, matchSettings.numberOfGames, matchSettings.scoreIncreasing)

    return (
      <View style={layout.main}>
        <ScrollView style={layout.content}>
          <Text style={layout.title}>
            {I18n.t('score')} {I18n.t('after')} {I18n.t('game')} {score.length}
          </Text>
          <ScoreBoard
            standing={standing}
          />
          <ProgressBoard
            score={score}
            numberOfGames={this.props.matchSettings.numberOfGames}
          />
        </ScrollView>
        <View>
          <Button
            text={matchOver ? I18n.t('gameOver') : I18n.t('nextGame')}
            onPress={() => {
              if(matchOver){
                navigate('FinalScore', {score: standing})
              } else {
                const {teams, players, games} = this.props
                const gameID = getRandomGameID(Object.keys(games), this.props.playedGames)
                const game = _.merge(_.cloneDeep(defaultGame), games[gameID])
                const teamNames = teams.map((a) => a.map((e) => players[e]))
                navigate('Game', {
                  teams: teamNames,
                  gameNumber: score.length+1,
                  game: game,
                  gameOver: (winnerTeam) => {
                    this.props.dispatch(actionCreators.addResult(gameID, winnerTeam))
                    navigate('Score')
                  }
                })}
              }
            }
          />
        </View>
      </View>
    );
  }
};

export default connect(mapStateToProps)(Score)
