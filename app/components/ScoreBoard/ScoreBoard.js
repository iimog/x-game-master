/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from './styles'

class ScoreBoard extends Component {
  render(){
    return(
      <View style={styles.scoreBoardContainer}>
        <View style={styles.scoreBoardNumberContainer}>
          <Text style={styles.standingText}>{this.props.standing[0]}</Text>
        </View>
        <View style={styles.scoreBoardNumberContainer}>
          <Text style={styles.standingText}>{this.props.standing[1]}</Text>
        </View>
      </View>
    );
  }
};

export default ScoreBoard
