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
import { shuffleTeams, getRandomGameID } from '../../lib/'
import _ from 'lodash'
import layout from '../../layouts'

const mapStateToProps = (state) => ({
  matchSettings: state.matchSettings,
  playerWin: state.playerWin,
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
  playerWin: Array<Array<number>>,
  teams: [Array<number>,Array<number>],
  players: Array<string>,
  games: {[string]: Game},
  dispatch: any,
  playedGames: Array<string>,
}

function getStanding(score: Array<Array<number>>, numberOfPlayers: number, scoreIncreasing: boolean): Array<number>{
  let standing = Array(numberOfPlayers).fill(0);
  for(let i=0; i<score.length; i++){
    let step = scoreIncreasing ? (i+1) : 1
    for(let j=0; j<score[i].length; j++){
      standing[score[i][j]] += step
    }
  }
  return standing
}

class ClubScore extends Component {
  static navigationOptions = {
    header: null,
  };
  props: myProps;
  state: {
    score: Array<Array<number>>,
  }
  constructor(props: myProps) {
    super(props)
  }

  render() {
    const { navigate } = this.props.navigation
    const { matchSettings, playerWin } = this.props
    let standing = getStanding(playerWin, this.props.players.length, matchSettings.scoreIncreasing)
    let matchOver = playerWin.length >= matchSettings.numberOfGames
    let playerScores = this.props.players.map(
      (name, index) => ({name: name, score: standing[index]})
    ).sort((a,b) => b.score-a.score).map(
      (elem) => {
        return (
          <Text key={elem.name}>{elem.name}: {elem.score}</Text>
        )
      }
    )

    return (
      <View style={layout.main}>
        <ScrollView style={layout.content}>
          <Text style={layout.title}>
            {I18n.t('score')} {I18n.t('after')} {I18n.t('game')} {playerWin.length}
          </Text>
          {playerScores}
        </ScrollView>
        <View>
          <Button
            text={matchOver ? I18n.t('backToMain') : I18n.t('nextGame')}
            onPress={() => {
              if(matchOver){
                navigate('Home')
              } else {
                const {teams, players, games, playedGames} = this.props
                const gameID = getRandomGameID(Object.keys(games), playedGames)
                const game = _.merge(_.cloneDeep(defaultGame), games[gameID])
                const teamNames = teams.map((a) => a.map((e) => players[e]))
                navigate('Game', {
                  teams: teamNames,
                  gameNumber: playerWin.length+1,
                  game: game,
                  gameOver: (winnerTeam) => {
                    this.props.dispatch(actionCreators.addResult(gameID, winnerTeam))
                    this.props.dispatch(actionCreators.setTeams(shuffleTeams(teams)))
                    navigate('ClubScore')
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

export default connect(mapStateToProps)(ClubScore)
