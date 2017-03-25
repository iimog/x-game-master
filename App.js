import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { MainScreen, HomeScreen } from './MainScreen';

const xMobile = StackNavigator({
  Home: { screen: MainScreen },
});

AppRegistry.registerComponent('xMobile', () => xMobile);
