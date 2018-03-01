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
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { PersistGate } from 'redux-persist/integration/react'
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
import AddGame from './routes/AddGame'


const AppNavigator = StackNavigator({
  Home: { screen: Home },
  PlayerSelect: { screen: PlayerSelect },
  Team: { screen: TeamSelect },
  Game: { screen: Game },
  Score: { screen: Score },
  FinalScore: { screen: FinalScore },
  MatchSettings: { screen: MatchSettings },
  ClubScore: { screen: ClubScore },
  AddGame: {screen: AddGame},
});


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)
let store = createStore(persistedReducer)
let persistor = persistStore(store)

class xMobile extends Component{
  render(){
    return(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('xMobile', () => xMobile);
