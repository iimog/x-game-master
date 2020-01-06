import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, TextInput, Button, Alert } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

class NewGameScreen extends React.Component {
  static navigationOptions = {
    title: 'New Game',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.container}> 
          <Text style={styles.title}>X</Text>
          <Text style={styles.label}>Player:</Text>
          <TextInput multiline={true} style={styles.inputArea}>Spieler A</TextInput>
          <Text style={styles.label}>Games:</Text>
          <TextInput multiline={true} style={styles.inputArea}>Spiel 1</TextInput>
          <Button
              title="Start"
              onPress={() => {
                Alert.alert("Let's go!")
                navigate('Leaderboard', {players: players})
              }}
            />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class LeaderboardScreen extends React.Component {
  render() {
    return (
        <View style={styles.container}> 
          <Text style={styles.title}>X</Text>
          <Text style={styles.label}>Spieler:</Text>
          <TextInput multiline={true} style={styles.inputArea}>Spieler A</TextInput>
          <Text style={styles.label}>Spiele:</Text>
          <TextInput multiline={true} style={styles.inputArea}>Spiel 1</TextInput>
          <Button
              title="Next Game"
              onPress={() => Alert.alert("Let's go!")}
            />
        </View>
    );
  }
}

const MainNavigator = createStackNavigator({
  NewGame: {screen: NewGameScreen},
  Leaderboard: {screen: LeaderboardScreen},
});

const App = createAppContainer(MainNavigator);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 32,
  },
  label: {
    fontSize: 20,
    marginVertical: 4,
  },
  inputArea: {
    backgroundColor: "#ddd",
    minWidth: 200,
  },
});

type Player = {
  name: string,
  active: boolean
}

let players: Array<Player> = [
  {name: "Markus", active: true},
  {name: "Hannah", active: true},
  {name: "Bernd", active: true},
  {name: "Moritz", active: true},
]

let games: Array<string> = [
  "Snake",
  "Blobby Volley",
  "Böse 6"
]

type Round = {
  game: string,
  teams: [Array<Player>, Array<Player>],
  winner: -1 | 0 | 1 | null
}

let rounds: Array<Round> = []