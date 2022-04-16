import 'react-native-gesture-handler';
import { dark as darkTheme, mapping } from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Main: undefined;
  About: undefined;
  Game: undefined;
  NewMatch: undefined;
  Matches: undefined;
  Leaderboard: undefined;
};

const App = () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={darkTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Main" component={MainScreen} />
              <Stack.Screen name="About" component={AboutScreen} />
              <Stack.Screen name="Game" component={GameScreen} />
              <Stack.Screen name="NewMatch" component={NewMatchScreen} />
              <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
              <Stack.Screen name="Matches" component={MatchesScreen} />
            </Stack.Navigator>
          </NavigationContainer>
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