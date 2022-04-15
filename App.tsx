import { dark as darkTheme, mapping } from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AboutScreen from './screens/AboutScreen';
import GameScreen from './screens/GameScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import MainScreen from './screens/MainScreen';
import NewMatchScreen from './screens/NewMatchScreen';
import { persistor, store } from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MatchesScreen from './screens/MatchesScreen';

const MainNavigator = createStackNavigator({
  Game: {screen: GameScreen},
  NewMatch: {screen: NewMatchScreen},
  Leaderboard: {screen: LeaderboardScreen},
  Matches: {screen: MatchesScreen},
  Main: {screen: MainScreen},
  About: {screen: AboutScreen},
}, {initialRouteName: 'Main', headerMode: 'none'});

const Navigation = createAppContainer(MainNavigator);

const App = () => (
      <React.Fragment>
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider mapping={mapping} theme={darkTheme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Navigation />
            </PersistGate>
          </Provider>
        </ApplicationProvider>
      </React.Fragment>
  );

store.subscribe(() => {
  const state = store.getState();
  if(state.matchId>0){
    try {
      AsyncStorage.setItem('@match:'+state.matchId, JSON.stringify({
        players: state.players,
        games: state.games,
        rounds: state.rounds,
        lastChange: state.lastChange,
      }));
    } catch (error) {
      console.error(error)
    }
  }
})

export default App;