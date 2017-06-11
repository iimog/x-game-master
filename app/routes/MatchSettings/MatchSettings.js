/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  Slider,
  Switch,
} from 'react-native';
import { connect } from 'react-redux'
import { actionCreators } from '../../redux'
import Button from '../../components/Button';
import Input from '../../components/Input';
import I18n, { gameT } from '../../i18n'
import type Game from '../Game/DefaultGame'
import _ from 'lodash'
import styles from './styles'
import layout from '../../layouts'

const mapStateToProps = (state) => ({matchSettings: state.matchSettings, games: state.games, collection: state.collection})

class MatchSettings extends Component {
  static navigationOptions = {
    title: I18n.t('matchSettings'),
  };

  state: {
    numberOfGames: number,
    eventSwitchIsOn: boolean,
    allGames: {[string]: Game},
  }

  constructor(props){
    super(props)
    const allList = {...props.collection}
    this.state = {
      numberOfGames: props.matchSettings.numberOfGames,
      eventSwitchIsOn: true,
      allGames: allList,
    }
  }

  componentWillMount(){
    this.props.dispatch(actionCreators.resetMatch())
    this.props.dispatch(actionCreators.setGames(this.state.allGames))
  }

  render() {
    const { matchSettings, dispatch, games } = this.props
    const { navigate } = this.props.navigation
    const { allGames } = this.state
    let gameSwitches = Array()
    for(let gameID of Object.keys(allGames)){
      gameSwitches.push(
        <View key={gameID} style={styles.gameSelector}><Switch
          value={gameID in games}
          onValueChange={(value)=>{
            let newGames = _.cloneDeep(games)
            if(value){
              newGames[gameID] = allGames[gameID]
            } else {
              delete newGames[gameID]
            }
            dispatch(actionCreators.setGames(newGames))
          }}
        /><Text>{gameT('name',allGames[gameID])}</Text></View>
      )
    }

    return (
      <View style={layout.main}>
        <ScrollView style={layout.content}>
          <Text>{I18n.t('numberOfGames')+": "+this.state.numberOfGames}</Text>
          <Slider
            maximumValue={20}
            minimumValue={1}
            value={this.props.matchSettings.numberOfGames}
            step={1}
            onSlidingComplete={(value) => dispatch(actionCreators.setNumberOfGames(value))}
            onValueChange={(value) => this.setState({numberOfGames: value})}
          />
          <Text>{I18n.t('scoreCount')} {matchSettings.scoreIncreasing ? I18n.t('increasing') : I18n.t('constant')}</Text>
          <Switch
            onValueChange={(value) => dispatch(actionCreators.setScoreIncreasing(value))}
            value={matchSettings.scoreIncreasing}
          />
          <Text>{I18n.t('games')}</Text>
          {gameSwitches}
        </ScrollView>
        <Button
          text={I18n.t('playerSelect')}
          onPress={()=>{navigate('PlayerSelect')}}
        />
      </View>
    );
  }
};

export default connect(mapStateToProps)(MatchSettings)
