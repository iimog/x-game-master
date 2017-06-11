/**
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  AsyncStorage,
} from 'react-native';
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { reducer } from './redux'
import { StackNavigator } from 'react-navigation';
import Home from './routes/Home';
import PlayerSelect from './routes/PlayerSelect';
import TeamSelect from './routes/TeamSelect';
import Game from './routes/Game';
import Score from './routes/Score';
import FinalScore from './routes/FinalScore';
import MatchSettings from './routes/MatchSettings'
import ClubScore from './routes/ClubScore'

const AppNavigator = StackNavigator({
  Home: { screen: Home },
  PlayerSelect: { screen: PlayerSelect },
  Team: { screen: TeamSelect },
  Game: { screen: Game },
  Score: { screen: Score },
  FinalScore: { screen: FinalScore },
  MatchSettings: { screen: MatchSettings },
  ClubScore: { screen: ClubScore },
});

const store = compose(autoRehydrate())(createStore)(reducer)

persistStore(store, {storage: AsyncStorage}, () => {
  console.log(store.getState())
})

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
