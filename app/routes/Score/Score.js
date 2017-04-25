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

const mapStateToProps = (state) => ({matchSettings: state.matchSettings, teamWin: state.teamWin, teams: state.teams, players: state.players})

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

  componentWillMount(){
    const { score } = this.state
    const { navigate } = this.props.navigation
    const { matchSettings } = this.props
    let standing = getStanding(score, matchSettings.scoreIncreasing)

  }

  render() {
    const { score } = this.state
    const { navigate } = this.props.navigation
    const { matchSettings } = this.props
    let standing = getStanding(score, matchSettings.scoreIncreasing)
    let matchOver = isMatchOver(standing, matchSettings.numberOfGames, matchSettings.scoreIncreasing)

    return (
      <View style={styles.main}>
        <ScrollView style={styles.content}>
          <Text style={styles.title}>
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
                navigate('Game', {score: score})}
              }
            }
          />
        </View>
      </View>
    );
  }
};

export default connect(mapStateToProps)(Score)
