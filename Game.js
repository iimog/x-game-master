import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import MyButton from './MyButton';


class MyText extends Component {
  render(){
    return <Text>{this.props.standing[0]} - {this.props.standing[1]}</Text>
  }
};

export class Game extends Component {
  static navigationOptions = {
    header: {visible: false},
  };

  constructor(props) {
    super(props)
    const {teams, score} = props.navigation.state.params;
    const gameList = require('./games/simple.json');
    this.state = {
      game: gameList[Math.floor(Math.random()*gameList.length)],
      teams: teams,
      score: score,
      standing: [0,0]
    }
  }

  setsToWin = 5

  handleScore(teamIndex){
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
      <View>
        <Text style={styles.title}>
          Game {score.length+1}: {game.name}
        </Text>
        <Text>
          (best of {game.bestOf})
        </Text>
        <MyButton
          text='Instructions'
          onPress={()=>Alert.alert( 'Instructions', this.state.game.instructions, [ {text: 'OK', onPress: () => {}} ], { cancelable: true } )}
        />
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
        <MyButton
          text="Skip this game"
          onPress={()=>Alert.alert( 'Skip game', "Are you sure you want to skip this game? The next one will start with 0-0.", [ {text: 'Yes', onPress: () => {navigate('Standing', {teams: this.state.teams, score: this.state.score})}}, {text: 'No', onPress: () => {}} ], { cancelable: true } )}
        />
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
  playerButton: {
  }
});
