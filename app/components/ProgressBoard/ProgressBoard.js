/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import styles from './styles'

function Tile(props: {num: number, winner: ?number}){
  let backgroundColor: string = 'transparent'
  if(typeof props.winner === 'number'){
    backgroundColor = ['skyblue', 'red'][props.winner]
  }
  return(
    <View style={StyleSheet.flatten([styles.scoreBoardNumberContainer,{backgroundColor: backgroundColor}])}>
      <Text style={styles.standingText}>{props.num.toString()}</Text>
    </View>
  )
}

function TileRow(props: {start: number, count: number, score: Array<number>}){
  let tiles: Array<Tile> = Array();
  for(let i=0; i<props.count; i++){
    tiles.push(
      <Tile num={props.start+i} winner={props.score[props.start+i-1]} key={props.start+i}/>
    )
  }
  return(
    <View style={styles.scoreBoardContainer}>
      {tiles}
    </View>
  )
}

class ProgressBoard extends Component {

  render(){
    let tilesPerRow = 5
    let rows: Array<TileRow> = Array();
    for(let i=1; i<=this.props.numberOfGames; i+=tilesPerRow){
      rows.push(
        <TileRow
          start={i}
          count={Math.min(tilesPerRow, this.props.numberOfGames-i+1)}
          key={i}
          score={this.props.score}
        />
      )
    }
    return(
      <View style={styles.container}>
        {rows}
      </View>
    );
  }
};

export default ProgressBoard
