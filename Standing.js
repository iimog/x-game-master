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

export class Standing extends Component {
  static navigationOptions = {
    header: {visible: false},
  };
  constructor(props) {
    super(props)
    const {teams, score} = props.navigation.state.params;
    this.state = {
      teams: teams,
      score: score
    }
  }

  totalRounds = 15

  render() {
    const { teams, score } = this.state
    const { navigate } = this.props.navigation
    let standing = [0,0];
    for(let i=0; i<score.length; i++){
      standing[score[i]] += (i+1)
    }
    if(standing[score[score.length-1]]>((1+this.totalRounds)*this.totalRounds)/4){
      return (
        <View>
          <Text>
            And the winner is: Team {score[score.length-1] === 0 ? 'blue' : 'red'}!
            Final score is {standing[0]} - {standing[1]} after {score.length} rounds.
            Congratulations to {teams[score[score.length-1]].toString()}.

            More luck next time to {teams[1-score[score.length-1]].toString()}
          </Text>
          <MyButton
            text="Back to Main Menu"
            onPress={() => navigate('Home')}
          />
        </View>
      )
    }

    return (
      <View>
        <Text>
          Standing after game {score.length}
        </Text>
        <MyText
          standing={standing}
        />
        <MyButton
          text="Next Game"
          onPress={() => navigate('Game', {teams: teams, score: score})}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    color: 'blue',
    fontSize: 22
  },
});
