/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import styles from './styles'

function Tile(props: {num: string, winner: ?number}){
  let backgroundColor: string = 'transparent'
  if(typeof props.winner === 'number'){
    backgroundColor = ['skyblue', 'red'][props.winner]
  }
  return(
    <View style={StyleSheet.flatten([styles.scoreBoardNumberContainer,{backgroundColor: backgroundColor}])}>
      <Text style={styles.standingText}>{props.num}</Text>
    </View>
  )
}

class ProgressBoard extends Component {

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.scoreBoardContainer}>
          <Tile num="1" winner={this.props.score[0]}/>
          <Tile num="2" winner={this.props.score[1]}/>
          <Tile num="3" winner={this.props.score[2]}/>
          <Tile num="4" winner={this.props.score[3]}/>
          <Tile num="5" winner={this.props.score[4]}/>
        </View>
        <View style={styles.scoreBoardContainer}>
          <Tile num="6" winner={this.props.score[5]}/>
          <Tile num="7" winner={this.props.score[6]}/>
          <Tile num="8" winner={this.props.score[7]}/>
          <Tile num="9" winner={this.props.score[8]}/>
          <Tile num="10" winner={this.props.score[9]}/>
        </View>
        <View style={styles.scoreBoardContainer}>
          <Tile num="11" winner={this.props.score[10]}/>
          <Tile num="12" winner={this.props.score[11]}/>
          <Tile num="13" winner={this.props.score[12]}/>
          <Tile num="14" winner={this.props.score[13]}/>
          <Tile num="15" winner={this.props.score[14]}/>
        </View>
      </View>
    );
  }
};

export default ProgressBoard
