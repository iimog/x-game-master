/**
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';
import MyButton from './MyButton';
import TeamList from './TeamList';

export class TeamScreen extends Component {
  static navigationOptions = {
    title: "Teams",
  };
  constructor(props) {
    super(props);
    const {players} = props.navigation.state.params;
    this.state = {
      players: [...players]
    };
  };
  /**
   * Shuffles array in place. ES6 version
   * @param {Array} a items The array containing the items.
   */
  shuffle = (a) => {
      let b = [...a];
      for (let i = b.length; i; i--) {
          let j = Math.floor(Math.random() * i);
          [b[i - 1], b[j]] = [b[j], b[i - 1]];
      }
      return b;
  }
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return (
      <ScrollView>
        <MyButton onPress={()=>{this.setState({players: this.shuffle(this.state.players)})}} text="Shuffle"/>
        <TeamList
          title="Team Blue"
          list={this.state.players.slice(0,Math.ceil(this.state.players.length/2))}
          color="skyblue"
        />
        <TeamList
          title="Team Red"
          list={this.state.players.slice(Math.ceil(this.state.players.length/2))}
          color="red"
        />
        <MyButton onPress={()=>{}} text="Start"/>
      </ScrollView>
    );
  }
};
