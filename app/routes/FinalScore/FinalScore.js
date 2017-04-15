/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import Button from '../../components/Button';
import styles from './styles'

type myProps = {
  navigation: {
    navigate: any,
    state: {
      params: {
        teams: [Array<string>,Array<string>],
        score: Array<number>,
      }
    }
  }
}

export class FinalScore extends Component {
  static navigationOptions = {
    header: {visible: false},
  };
  props: myProps;
  state: {
    teams: [Array<string>, Array<string>],
    score: Array<number>
  }
  constructor(props: myProps) {
    super(props)
    const {teams, score} = props.navigation.state.params;
    this.state = {
      teams: teams,
      score: score
    }
  }

  render() {
    const { teams, score } = this.state
    const { navigate } = this.props.navigation
    let standing = [0,0];
    for(let i=0; i<score.length; i++){
      standing[score[i]] += (i+1)
    }
    return (
      <View>
        <Text style={styles.text}>
          And the winner is: Team {score[score.length-1] === 0 ? 'blue' : 'red'}!
          Final score is {standing[0]} - {standing[1]} after {score.length} rounds.
          Congratulations to {teams[score[score.length-1]].toString()}.

          More luck next time to {teams[1-score[score.length-1]].toString()}
        </Text>
        <Button
          text="Back to Main Menu"
          onPress={() => navigate('Home')}
        />
      </View>
    )
  }
};
