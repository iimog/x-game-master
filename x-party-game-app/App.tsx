import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, TextInput, Button, ScrollView, FlatList } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import _ from 'lodash';
import {Provider, connect} from 'react-redux';
import {Player, Round, store} from './store'

class NewGameScreen extends React.Component<{navigation, dispatch, players: Array<Player>, games: Array<string>},{playerText: string, gameText: string}> {
  constructor(props) {
    super(props);
    this.state = {
      playerText: this.props.players.map(p => p.name).join("\n"),
      gameText: this.props.games.join("\n"),
    };
  }
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
          <TextInput multiline={true} style={styles.inputArea} onChangeText={(text) => this.setState({playerText: text})} value={this.state.playerText}></TextInput>
          <Text style={styles.label}>Games:</Text>
          <TextInput multiline={true} style={styles.inputArea} onChangeText={(text) => this.setState({gameText: text})} value={this.state.gameText}></TextInput>
          <Button
              title="Start"
              onPress={() => {
                //Alert.alert("Let's go!")
                this.props.dispatch({
                  type: 'START_MATCH',
                  payload: {
                    players: this.state.playerText.split('\n').map((word) => {return {name: word, active: true}}),
                    games: _.shuffle(this.state.gameText.split('\n'))
                  }})
                navigate('Leaderboard')
              }}
            />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const ConnectedNewGameScreen = connect(state=>state)(NewGameScreen)

class LeaderboardScreen extends React.Component<{navigation, players: Array<Player>, rounds: Array<Round>, games: Array<string>},{}> {
  getPlayerScores: () => { [key: string]: number; } = () => {
    let playerScores = {};
    const {rounds, players} = this.props;
    players.map(x => playerScores[x.name] = 0);
    for(let i=0; i<rounds.length; i++){
      let round = rounds[i]
     // if(round.winner in [0,1]){
        round.teams[round.winner].map(player => playerScores[player.name]+=(i+1));
     // }
    }
    return playerScores;
  }
  render() {
    const {navigate} = this.props.navigation;
    let playerScores = this.getPlayerScores();
    let isOver = this.props.rounds.length >= this.props.games.length;
    return (
        <View style={styles.container}> 
          <FlatList
            data={this.props.players.sort((x,y) => playerScores[y.name]-playerScores[x.name])}
            renderItem={({item, index}) => <LeaderboardEntry rank={index+1} name={item.name} points={playerScores[item.name]}/>}
            keyExtractor={item => item.name}
          />
          <Button
              title={isOver ? "Back to Main" : "Next Game"}
              onPress={() => isOver ? navigate('NewGame') : navigate('Game')}
            />
        </View>
    );
  }
}
const ConnectedLeaderboardScreen = connect(state => state)(LeaderboardScreen)

class GameScreen extends React.Component<{navigation, dispatch, players: Array<Player>, rounds: Array<Round>, games: Array<string>},{}> {
  getRandomTeams: (players: Array<Player>) => Array<Array<Player>> = (players) => {
    let shuffledPlayers = _.shuffle(players);
    let splitPoint = Math.floor(players.length/2)
    if(players.length % 2){
      splitPoint += _.random();
    }
    let teams = [shuffledPlayers.slice(0,splitPoint), shuffledPlayers.slice(splitPoint)]
    return teams;
  }
  reportResult: (index: number, teams: Array<Array<Player>>) => void = (index, teams) => {
    this.props.dispatch({type: 'GAME_RESULT', payload: { game: this.game, teams: teams, winner: index }})
  }
  game: string = this.props.games[this.props.rounds.length];
  render() {
    let teams = this.getRandomTeams(this.props.players);
    return (
        <View style={styles.container}>
          <Text style={styles.title}>{this.game}</Text>
          <FlatList
            data={teams[0]}
            renderItem={({item}) => <Text>{item.name}</Text>}
            keyExtractor={item => item.name}
          />
          <FlatList
            data={teams[1]}
            renderItem={({item}) => <Text>{item.name}</Text>}
            keyExtractor={item => item.name}
          />
          <Button
              title="Win Team1"
              onPress={() => {
                this.reportResult(0, teams)
                this.props.navigation.navigate('Leaderboard')
              }}
            />
          <Button
              title="Win Team2"
              onPress={() => {
                this.reportResult(1, teams)
                this.props.navigation.navigate('Leaderboard')
              }}
            />
        </View>
    );
  }
}
const ConnectedGameScreen = connect(state => state)(GameScreen)

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
  Game: {screen: ConnectedGameScreen},
  NewGame: {screen: ConnectedNewGameScreen},
  Leaderboard: {screen: ConnectedLeaderboardScreen},
}, {initialRouteName: 'NewGame'});

const Navigation = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

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
