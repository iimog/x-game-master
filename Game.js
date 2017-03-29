/**
 * @flow
 */

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

export class Game extends Component {
  static navigationOptions = {
    header: {visible: false},
  };
  constructor(props) {
    super(props)
    const {teams, game} = props.navigation.state.params;
    this.state = {
      teams: teams,
      game: game
    }
  }

  render() {
    const {players} = this.state
    const { navigate } = this.props.navigation

    return (
      <View>
        <Text>
          Game {this.state.game}: Schnick-Schnack-Schnuck
        </Text>
        <MyButton
          text="Team blue"
          onPress={()=>console.log("blue")}
        />
        <MyButton
          text="Team red"
          onPress={()=>console.log("red")}
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
