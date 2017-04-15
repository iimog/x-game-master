/**
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './routes/Home';
import PlayerSelect from './routes/PlayerSelect';
import TeamSelect from './routes/TeamSelect';
import Game from './routes/Game';
import Score from './routes/Score';

const xMobile = StackNavigator({
  Home: { screen: Home },
  NewGame: { screen: PlayerSelect },
  Team: { screen: TeamSelect },
  Game: { screen: Game },
  Score: { screen: Score }
});

AppRegistry.registerComponent('xMobile', () => xMobile);
