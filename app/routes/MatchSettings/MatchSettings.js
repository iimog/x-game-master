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
import I18n from '../../i18n'

const mapStateToProps = (state) => ({matchSettings: state.matchSettings})

class MatchSettings extends Component {
  static navigationOptions = {
    title: I18n.t('matchSettings'),
  };

  state: {
    numberOfGames: number,
    eventSwitchIsOn: boolean,
  }

  constructor(props){
    super(props)
    this.state = {
      numberOfGames: props.matchSettings.numberOfGames,
      eventSwitchIsOn: true,
    }
  }

  render() {
    const { matchSettings, dispatch } = this.props
    const { navigate } = this.props.navigation

    return (
      <ScrollView>
        <Text>{I18n.t('numberOfGames')+": "+this.state.numberOfGames}</Text>
        <Slider
          maximumValue={20}
          minimumValue={1}
          value={this.props.matchSettings.numberOfGames}
          step={1}
          onSlidingComplete={(value) => dispatch(actionCreators.setNumberOfGames(value))}
          onValueChange={(value) => this.setState({numberOfGames: value})}
        />
        <Text>Score {matchSettings.scoreIncreasing ? 'increasing' : 'constant'}</Text>
        <Switch
          onValueChange={(value) => dispatch(actionCreators.setScoreIncreasing(value))}
          style={{marginBottom: 10}}
          value={matchSettings.scoreIncreasing}
        />
        <Button
          text={I18n.t('start')}
          onPress={()=>{navigate('Game', {score: []})}}
        />
      </ScrollView>
    );
  }
};

export default connect(mapStateToProps)(MatchSettings)
