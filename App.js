import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { MainScreen } from './MainScreen';
import { NewGameScreen } from './NewGame';
import { TeamScreen } from './TeamScreen';

const xMobile = StackNavigator({
  Home: { screen: MainScreen },
  NewGame: { screen: NewGameScreen },
  Team: { screen: TeamScreen }
});

AppRegistry.registerComponent('xMobile', () => xMobile);
