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
import _ from 'lodash'

const mapStateToProps = (store) => ({players: store.players, teams: store.teams})

type props = {
  navigation: any,
  teams: [Array<number>,Array<number>],
  players: Array<string>
};

class Game extends Component {
  state: {
    game: {
      name: string,
      description: string,
      instructions: string,
      bestOf: number
    },
    teams: Array<Array<string>>,
    score: Array<number>,
    standing: Array<number>
  }
  static navigationOptions = {
    header: {visible: false},
  };

  constructor(props: props) {
    super(props)
    const {score} = props.navigation.state.params;
    const {players, teams} = props;
    const teamNames = teams.map((a) => a.map((e) => players[e]))
    const gameList = require('../../games/simple.json');
    const gameIndex = Math.floor(Math.random()*gameList.length)
    const game = _.merge(defaultGame, gameList[gameIndex])
    this.state = {
      game: game,
      teams: teamNames,
      score: score,
      standing: [0,0]
    }
  }

  setsToWin = 5

  handleScore(teamIndex: number){
    let st = [...this.state.standing]
    st[teamIndex]++
    if(st[teamIndex]>(this.state.game.bestOf/2)){
      this.props.navigation.navigate('Score', {score: [...this.state.score, teamIndex]})
    } else {
      this.setState({standing: st});
    }
  }

  render() {
    const {teams, score, game} = this.state
    const { navigate } = this.props.navigation

    return (
      <View style={styles.main}>
        <View></View>
        <View style={styles.content}>
          <Text style={styles.title}>
            {I18n.t('game')} {score.length+1}: {gameT('name', game)}
          </Text>
          <Text alignSelf="center">
            (best of {game.bestOf})
          </Text>
          <ScoreBoard
            standing={this.state.standing}
          />
          <View style={styles.buttonView}>
            <View style={styles.playerButtonView}>
            <Button
              text={this.state.teams[0][Math.floor(Math.random()*this.state.teams[0].length)]}
              onPress={()=>this.handleScore(0)}
            />
            </View>
            <View style={styles.playerButtonView}>
            <Button
              text={this.state.teams[1][Math.floor(Math.random()*this.state.teams[1].length)]}
              onPress={()=>this.handleScore(1)}
            />
            </View>
          </View>
        </View>
        <View>
          <Button
            text={I18n.t('instructions')}
            onPress={()=>Alert.alert( 'Instructions', gameT('instructions', game), [ {text: 'OK', onPress: () => {}} ], { cancelable: true } )}
          />
          <Button
            text={I18n.t('skipGame')}
            onPress={()=>Alert.alert( I18n.t('skipGame'), I18n.t('skipGameDialog'), [ {text: 'Yes', onPress: () => {navigate('Score', {teams: this.state.teams, score: this.state.score})}}, {text: 'No', onPress: () => {}} ], { cancelable: true } )}
          />
        </View>
      </View>
    );
  }
};

export default connect(mapStateToProps)(Game)
