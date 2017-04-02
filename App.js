/**
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { MainScreen } from './MainScreen';
import { NewGameScreen } from './NewGame';
import { TeamScreen } from './TeamScreen';
import { Game } from './Game';
import { Standing } from './Standing';

const xMobile = StackNavigator({
  Home: { screen: MainScreen },
  NewGame: { screen: NewGameScreen },
  Team: { screen: TeamScreen },
  Game: { screen: Game },
  Standing: { screen: Standing }
});

AppRegistry.registerComponent('xMobile', () => xMobile);
