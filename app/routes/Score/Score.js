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

const mapStateToProps = (state) => ({matchSettings: state.matchSettings})

type myProps = {
  navigation: {
    navigate: any,
    state: {
      params: {
        score: Array<number>,
      }
    }
  },
  matchSettings: {
    numberOfGames: number,
    scoreIncreasing: boolean,
  },
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
    const {score} = props.navigation.state.params;
    this.state = {
      score: score
    }
  }

  componentWillMount(){
    const { score } = this.state
    const { navigate } = this.props.navigation
    const { matchSettings } = this.props
    let standing = getStanding(score, matchSettings.scoreIncreasing)
    if(isMatchOver(standing, matchSettings.numberOfGames, matchSettings.scoreIncreasing)){
      navigate('FinalScore', {score: score})
    }
  }

  render() {
    const { score } = this.state
    const { navigate } = this.props.navigation
    const { matchSettings } = this.props
    let standing = getStanding(score, matchSettings.scoreIncreasing)

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
            text={I18n.t('nextGame')}
            onPress={() => navigate('Game', {score: score})}
          />
        </View>
      </View>
    );
  }
};

export default connect(mapStateToProps)(Score)
