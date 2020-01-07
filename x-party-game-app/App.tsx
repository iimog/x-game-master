import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, TextInput, Button, Alert, FlatList } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

class NewGameScreen extends React.Component<{navigation: any},{}> {
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
          <FlatList
            data={players}
            renderItem={({item, index}) => <LeaderboardEntry rank={index+1} name={item.name} points={17}/>}
            keyExtractor={item => item.name}
          />
          <Button
              title="Next Game"
              onPress={() => Alert.alert("Let's go!")}
            />
        </View>
    );
  }
}

class LeaderboardEntry extends React.Component<{rank: number, name: string, points: number}, {}> {
  render() {
    return (
      <View style={styles.lbEntryContainer}>
        <Text style={styles.lbEntryRank}>{this.props.rank}</Text>
        <Text style={styles.lbEntryName}>{this.props.name}</Text>
        <Text style={styles.lbEntryPoints}>{this.props.points}</Text>
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
  lbEntryContainer: {
    flex: 1,
    flexDirection: "row",
  },
  lbEntryRank: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  lbEntryName: {
    fontSize: 20,
  },
  lbEntryPoints: {
    fontSize: 20,
    marginHorizontal: 5,
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