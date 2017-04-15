/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';
import Button from '../../components/Button';
import TeamList from '../../../TeamList';
import styles from './styles';

export class TeamSelect extends Component {
  props: {
    navigation: any
  };
  state: {
    players: Array<String>
  }
  static navigationOptions = {
    title: "Teams",
  };
  constructor(props: {navigation: any}) {
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
  shuffle = <T>(a: Array<T>): Array<T> => {
      let b = [...a];
      for (let i = b.length; i; i--) {
          let j = Math.floor(Math.random() * i);
          // the next three lines could be replaced by [b[i - 1]b[j]] = [b[j], b[i - 1]] but flow (v0.38.0) does not like it
          let [x,y] = [b[j], b[i - 1]];
          b[i - 1] = x;
          b[j] = y;
      }
      return b;
  }
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return (
      <ScrollView>
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
        <View style={styles.buttons}>
          <Button onPress={()=>{this.setState({players: this.shuffle(this.state.players)})}} text="Shuffle"/>
          <Button onPress={()=>{navigate('Game', {teams: [this.state.players.slice(0,Math.ceil(this.state.players.length/2)), this.state.players.slice(Math.ceil(this.state.players.length/2))], score: []})}} text="Start"/>
        </View>
      </ScrollView>
    );
  }
};
