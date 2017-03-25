import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { MainScreen } from './MainScreen';
import { NewGameScreen } from './NewGame';

const xMobile = StackNavigator({
  Home: { screen: MainScreen },
  NewGame: { screen: NewGameScreen }
});

AppRegistry.registerComponent('xMobile', () => xMobile);
