/**
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation';
import Home from './routes/Home';
import PlayerSelect from './routes/PlayerSelect';
import TeamSelect from './routes/TeamSelect';
import Game from './routes/Game';
import Score from './routes/Score';
import FinalScore from './routes/FinalScore';
import MatchSettings from './routes/MatchSettings'
import { reducer } from './redux'

const AppNavigator = StackNavigator({
  Home: { screen: Home },
  NewGame: { screen: PlayerSelect },
  Team: { screen: TeamSelect },
  Game: { screen: Game },
  Score: { screen: Score },
  FinalScore: { screen: FinalScore },
  MatchSettings: { screen: MatchSettings },
});

const store = createStore(reducer);

class xMobile extends Component{
  render(){
    return(
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('xMobile', () => xMobile);
