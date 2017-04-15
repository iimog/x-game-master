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
import { TeamScreen } from '../TeamScreen';
import { Game } from '../Game';
import { Standing } from '../Standing';

const xMobile = StackNavigator({
  Home: { screen: Home },
  NewGame: { screen: PlayerSelect },
  Team: { screen: TeamScreen },
  Game: { screen: Game },
  Standing: { screen: Standing }
});

AppRegistry.registerComponent('xMobile', () => xMobile);
