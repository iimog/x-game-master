/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import Button from '../../components/Button';
import ScoreBoard from '../../components/ScoreBoard';
import styles from './styles';
import I18n, {gameT} from '../../i18n'
import defaultGame from './DefaultGame'
import type Game from './DefaultGame'
import _ from 'lodash'
import layout from '../../layouts'

type props = {
  navigation: any,
};

class DrawRandomNoRepetitions{
  all: Array<string>
  remainder: Array<string>
  name: string
  constructor(teamName: string, teamMembers: Array<string>){
    this.all = [...teamMembers]
    this.name = teamName
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
  getRandomPlayers(n: number): string{
    if(n === 0){
      return this.name
    }
    let players: Array<string> = Array()
    while(players.length < n){
      players.push(this.nextRandom())
      if(this.all.length>=n){
        players = _.uniq(players)
      }
    }
    return players.join(', ')
  }
}

class GameScreen extends Component {
  state: {
    game: Game,
    teams: Array<Array<string>>,
    gameNumber: number,
    standing: Array<number>,
    players: [string, string],
    goingFirst: number,
  }
  static navigationOptions = {
    header: null
  };

  drawRandomTeam1: DrawRandomNoRepetitions
  drawRandomTeam2: DrawRandomNoRepetitions

  constructor(props: props) {
    super(props)
    const {teams, gameNumber, game} = props.navigation.state.params;
    this.drawRandomTeam1 = new DrawRandomNoRepetitions(I18n.t('team1'), teams[0])
    this.drawRandomTeam2 = new DrawRandomNoRepetitions(I18n.t('team2'), teams[1])
    let goingFirst = Math.floor(Math.random()*2)
    this.state = {
      game: game,
      gameNumber: gameNumber,
      teams: teams,
      players: [this.drawRandomTeam1.getRandomPlayers(game.activePlayers), this.drawRandomTeam2.getRandomPlayers(game.activePlayers)],
      standing: [0,0],
      goingFirst: goingFirst,
    }
  }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }

  handleScore(teamIndex: number){
    let st = [...this.state.standing]
    if(teamIndex === -1){
      st[0]++
      st[1]++
    }
    if(teamIndex >= 0){
      st[teamIndex]++
      if(st[teamIndex]>(this.state.game.bestOf/2) && st[teamIndex]>st[1-teamIndex]){
        this.props.navigation.state.params.gameOver(teamIndex)
      }
    }
    this.setState({
      standing: st,
      players: [
        this.drawRandomTeam1.getRandomPlayers(this.state.game.activePlayers),
        this.drawRandomTeam2.getRandomPlayers(this.state.game.activePlayers)
      ],
      goingFirst: Math.floor(Math.random()*2),
    });
  }

  render() {
    const {teams, game, players, gameNumber} = this.state
    const { navigate } = this.props.navigation

    return (
      <View style={layout.main}>
        <View></View>
        <View style={layout.content}>
          <Text style={layout.title}>
            {I18n.t('game')} {gameNumber}: {gameT('name', game)}
          </Text>
          <Text alignSelf="center">
            {I18n.t('bestOf')}: {game.bestOf}
          </Text>
          <ScoreBoard
            standing={this.state.standing}
          />
          {
            game.tiePossible &&
            <View style={styles.tieButtonView}>
              <Button
                text={I18n.t('both')}
                onPress={()=>this.handleScore(-1)}
              />
            </View>
          }
          <View style={styles.buttonView}>
            <View style={styles.multiButtonView}>
            <Button
              text={players[0]}
              onPress={()=>this.handleScore(0)}
            />
            </View>
            <View style={styles.multiButtonView}>
            <Button
              text={players[1]}
              onPress={()=>this.handleScore(1)}
            />
            </View>
          </View>
          {
            game.tiePossible &&
            <View style={styles.tieButtonView}>
              <Button
                style={styles.tieButton}
                text={I18n.t('nobody')}
                onPress={()=>this.handleScore(-2)}
              />
            </View>
          }
          {
            game.randomStarter &&
            <Text>{I18n.t('goingFirst')}: {players[this.state.goingFirst]}</Text>
          }
        </View>
        <View style={styles.buttonView}>
          <View style={styles.multiButtonView}>
            <Button
              icon="users"
              onPress={()=>Alert.alert(
                I18n.t('teams'),
                I18n.t('team1')+":\n"+teams[0].join(", ")+"\n\n"+I18n.t('team2')+":\n"+teams[1].join(", "),
                [ {text: 'OK', onPress: () => {}} ],
                { cancelable: true }
              )}
            />
          </View>
          <View style={styles.multiButtonView}>
            <Button
              icon="infoCircle"
              onPress={()=>Alert.alert( I18n.t('instructions'), gameT('instructions', game), [ {text: 'OK', onPress: () => {}} ], { cancelable: true } )}
            />
          </View>
          <View style={styles.multiButtonView}>
            <Button
              icon="exchange"
              onPress={()=>Alert.alert( I18n.t('skipGame'), I18n.t('skipGameDialog'), [ {text: I18n.t('yes'), onPress: () => {
                this.props.navigation.state.params.gameOver(-1)}
              }, {text: I18n.t('no'), onPress: () => {}} ], { cancelable: true } )}
            />
          </View>
        </View>
      </View>
    );
  }
};

export default GameScreen
