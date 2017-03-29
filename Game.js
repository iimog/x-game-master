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
    const {teams, game} = props.navigation.state.params;
    this.state = {
      teams: teams,
      game: game,
      standing: [0,0]
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
        <MyText
          standing={this.state.standing}
        />
        <MyButton
          text={this.state.teams[0][Math.floor(Math.random()*this.state.teams[0].length)]}
          onPress={()=>this.setState({standing: [this.state.standing[0]+1,this.state.standing[1]]})}
        />
        <MyButton
          text={this.state.teams[1][Math.floor(Math.random()*this.state.teams[1].length)]}
          onPress={()=>this.setState({standing: [this.state.standing[0],this.state.standing[1]+1]})}
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
