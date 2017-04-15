/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import MyButton from '../../../MyButton';


class MyText extends Component {
  render(){
    return(
      <View style={styles.buttonView}>
        <View style={styles.playerButtonView}>
          <Text style={styles.standingText}>{this.props.standing[0]}</Text>
        </View>
        <View style={styles.playerButtonView}>
          <Text style={styles.standingText}>{this.props.standing[1]}</Text>
        </View>
      </View>
    );
  }
};

export class Game extends Component {
  props: {
    navigation: any
  };
  state: {
    game: {
      name: string,
      description: string,
      instructions: string,
      bestOf: number
    },
    teams: Array<string>,
    score: Array<number>,
    standing: Array<number>
  }
  static navigationOptions = {
    header: {visible: false},
  };

  constructor(props: {navigation: any}) {
    super(props)
    const {teams, score} = props.navigation.state.params;
    const gameList = require('../../../games/simple.json');
    this.state = {
      game: gameList[Math.floor(Math.random()*gameList.length)],
      teams: teams,
      score: score,
      standing: [0,0]
    }
  }

  setsToWin = 5

  handleScore(teamIndex: number){
    let st = [...this.state.standing]
    st[teamIndex]++
    if(st[teamIndex]>(this.state.game.bestOf/2)){
      this.props.navigation.navigate('Standing', {teams: this.state.teams, score: [...this.state.score, teamIndex]})
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
            Game {score.length+1}: {game.name}
          </Text>
          <Text alignSelf="center">
            (best of {game.bestOf})
          </Text>
          <MyText
            standing={this.state.standing}
          />
          <View style={styles.buttonView}>
            <View style={styles.playerButtonView}>
            <MyButton
              text={this.state.teams[0][Math.floor(Math.random()*this.state.teams[0].length)]}
              onPress={()=>this.handleScore(0)}
            />
            </View>
            <View style={styles.playerButtonView}>
            <MyButton
              text={this.state.teams[1][Math.floor(Math.random()*this.state.teams[1].length)]}
              onPress={()=>this.handleScore(1)}
            />
            </View>
          </View>
        </View>
        <View>
          <MyButton
            text='Instructions'
            onPress={()=>Alert.alert( 'Instructions', this.state.game.instructions, [ {text: 'OK', onPress: () => {}} ], { cancelable: true } )}
          />
          <MyButton
            text="Skip this game"
            onPress={()=>Alert.alert( 'Skip game', "Are you sure you want to skip this game? The next one will start with 0-0.", [ {text: 'Yes', onPress: () => {navigate('Standing', {teams: this.state.teams, score: this.state.score})}}, {text: 'No', onPress: () => {}} ], { cancelable: true } )}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 30
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  playerButtonView: {
    flex: 1,
    padding: 5
  },
  standingText: {
    alignSelf: 'center',
    fontSize: 72
  },
  content: {
    flex: 1,
  },
  main: {
    flex: 1,
    margin: 5,
  }
});
