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
import ScoreBoard from '../../components/ScoreBoard';
import styles from './styles';
import I18n, {gameT} from '../../i18n'
import defaultGame from './DefaultGame'
import type Game from './DefaultGame'
import _ from 'lodash'

const mapStateToProps = (store) => ({players: store.players, teams: store.teams, games: store.games})

type props = {
  navigation: any,
  teams: [Array<number>,Array<number>],
  players: Array<string>,
  games: {[string]: Game},
};

class DrawRandomNoRepetitions{
  all: Array<string>
  remainder: Array<string>
  constructor(team: Array<string>){
    this.all = [...team]
    this.reset()
  }
  reset(){
    this.remainder = [...this.all]
  }
  nextRandom(): string{
    if(this.remainder.length === 0){
      this.reset()
    }
    return this.remainder.splice(Math.floor(Math.random()*this.remainder.length),1)[0]
  }
}

class GameScreen extends Component {
  state: {
    game: {
      name: string,
      description: string,
      instructions: string,
      bestOf: number
    },
    teams: Array<Array<string>>,
    score: Array<number>,
    standing: Array<number>,
    players: [string, string],
  }
  static navigationOptions = {
    header: {visible: false},
  };

  drawRandomTeam1: DrawRandomNoRepetitions
  drawRandomTeam2: DrawRandomNoRepetitions

  constructor(props: props) {
    super(props)
    const {score} = props.navigation.state.params;
    const {players, teams} = props;
    const teamNames = teams.map((a) => a.map((e) => players[e]))
    const gameList = props.games;
    const gameIndex = Object.keys(gameList)[Math.floor(Math.random()*Object.keys(gameList).length)]
    const game = _.merge({...defaultGame}, gameList[gameIndex])
    this.drawRandomTeam1 = new DrawRandomNoRepetitions(teamNames[0])
    this.drawRandomTeam2 = new DrawRandomNoRepetitions(teamNames[1])
    this.state = {
      game: game,
      teams: teamNames,
      score: score,
      players: [this.drawRandomTeam1.nextRandom(), this.drawRandomTeam2.nextRandom()],
      standing: [0,0]
    }
  }

  handleScore(teamIndex: number){
    let st = [...this.state.standing]
    st[teamIndex]++
    if(st[teamIndex]>(this.state.game.bestOf/2)){
      this.props.navigation.navigate('Score', {score: [...this.state.score, teamIndex]})
    } else {
      this.setState({
        standing: st,
        players: [
          this.drawRandomTeam1.nextRandom(),
          this.drawRandomTeam2.nextRandom()
        ]});
    }
  }

  render() {
    const {teams, score, game, players} = this.state
    const { navigate } = this.props.navigation

    return (
      <View style={styles.main}>
        <View></View>
        <View style={styles.content}>
          <Text style={styles.title}>
            {I18n.t('game')} {score.length+1}: {gameT('name', game)}
          </Text>
          <Text alignSelf="center">
            {I18n.t('bestOf')}: {game.bestOf}
          </Text>
          <ScoreBoard
            standing={this.state.standing}
          />
          <View style={styles.buttonView}>
            <View style={styles.playerButtonView}>
            <Button
              text={players[0]}
              onPress={()=>this.handleScore(0)}
            />
            </View>
            <View style={styles.playerButtonView}>
            <Button
              text={players[1]}
              onPress={()=>this.handleScore(1)}
            />
            </View>
          </View>
        </View>
        <View>
          <Button
            text={I18n.t('instructions')}
            onPress={()=>Alert.alert( I18n.t('instructions'), gameT('instructions', game), [ {text: 'OK', onPress: () => {}} ], { cancelable: true } )}
          />
          <Button
            text={I18n.t('skipGame')}
            onPress={()=>Alert.alert( I18n.t('skipGame'), I18n.t('skipGameDialog'), [ {text: I18n.t('yes'), onPress: () => {navigate('Score', {teams: this.state.teams, score: this.state.score})}}, {text: I18n.t('no'), onPress: () => {}} ], { cancelable: true } )}
          />
        </View>
      </View>
    );
  }
};

export default connect(mapStateToProps)(GameScreen)
