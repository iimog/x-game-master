/**
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Home } from './routes/Home';
import { PlayerSelect } from './routes/PlayerSelect';
import { TeamSelect } from './routes/TeamSelect';
import { Game } from '../Game';
import { Standing } from '../Standing';

const xMobile = StackNavigator({
  Home: { screen: Home },
  NewGame: { screen: PlayerSelect },
  Team: { screen: TeamSelect },
  Game: { screen: Game },
  Standing: { screen: Standing }
});

AppRegistry.registerComponent('xMobile', () => xMobile);
