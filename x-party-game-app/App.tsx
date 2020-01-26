import React from 'react';
import { Dimensions, StyleSheet, TouchableWithoutFeedback, View, Keyboard, FlatList } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import _ from 'lodash';
import {Provider, connect} from 'react-redux';
import {Player, Round, store, persistor} from './store'
import { ListItem, List, Text, Input, ApplicationProvider, IconRegistry, Layout, Button, Icon } from '@ui-kitten/components';
import { mapping, dark as darkTheme } from '@eva-design/eva';
import { SafeAreaView } from 'react-navigation';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import InputScrollView from 'react-native-input-scroll-view';
import { PersistGate } from 'redux-persist/integration/react';

// TODO replace with background-basic-color-1 from theme
const dartThemeBackground = '#222B45'
const fullWidth = Dimensions.get('window').width

class NewGameScreen extends React.Component<{navigation, dispatch, players: Array<Player>, games: Array<string>},{playerText: string, gameText: string}> {
  constructor(props) {
    super(props);
    this.state = {
      playerText: this.props.players.map(p => p.name).join("\n"),
      gameText: this.props.games.join("\n"),
    };
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: dartThemeBackground}}>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <InputScrollView style={{flex:1, width: fullWidth, padding: 15}}>
            <Text category="h1" style={{flex: 1, textAlign: 'center', margin: 15}}>X</Text>
            <Text category="h3">Players</Text>
            <Input multiline={true} scrollEnabled={false} onChangeText={(text) => this.setState({playerText: text})} value={this.state.playerText}></Input>
            <Text category="h3">Games</Text>
            <Input multiline={true} scrollEnabled={false} onChangeText={(text) => this.setState({gameText: text})} value={this.state.gameText}></Input>
            <Button
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
              >Start</Button>
          </InputScrollView>
        </TouchableWithoutFeedback>
      </Layout></SafeAreaView>
    );
  }
}
const ConnectedNewGameScreen = connect(state=>state)(NewGameScreen)

class LeaderboardScreen extends React.Component<{navigation, dispatch, players: Array<Player>, rounds: Array<Round>, games: Array<string>},{}> {
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
    let sortedPlayers = this.props.players.sort((x,y) => playerScores[y.name]-playerScores[x.name])
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: dartThemeBackground}}>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: fullWidth, padding: 15}}> 
          <List
            data={sortedPlayers}
            renderItem={({item, index}) => {
              return(
                <ListItem onPress={(index) => {
                  this.props.dispatch({type: 'TOGGLE_PLAYER', payload: sortedPlayers[index].name})
                }}>
                  <LeaderboardEntry rank={index+1} name={item.name} points={playerScores[item.name]} active={item.active}/>
                </ListItem>
              )}
            }
            keyExtractor={item => item.name}
          />
          <Button onPress={() => isOver ? navigate('NewGame') : navigate('Game')}>
            {isOver ? "Back to Main" : "Next Game"}
          </Button>
        </View>
      </Layout>
      </SafeAreaView>
    );
  }
}
const ConnectedLeaderboardScreen = connect(state => state)(LeaderboardScreen)

class GameScreen extends React.Component<{navigation, dispatch, players: Array<Player>, rounds: Array<Round>, games: Array<string>},{}> {
  getRandomTeams: (players: Array<Player>) => Array<Array<Player>> = (players) => {
    let activePlayers = players.filter(p => p.active)
    let shuffledPlayers = _.shuffle(activePlayers);
    let splitPoint = Math.floor(activePlayers.length/2)
    if(activePlayers.length % 2){
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
      <SafeAreaView style={{ flex: 1, backgroundColor: dartThemeBackground}}>
      <Layout style={{flex: 1}}>
        <View style={{flex: 1, width: fullWidth, justifyContent: "space-around", alignItems: "center", padding: 15}}>
          <Text category="h1">{this.game}</Text>
          <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-around', alignItems: 'flex-start', paddingTop: 30}}>
            <FlatList
              data={teams[0]}
              renderItem={({item}) => <Text category="h4">{item.name}</Text>}
              keyExtractor={item => item.name}
            />
            <FlatList
              data={teams[1]}
              renderItem={({item}) => <Text category="h4" style={{textAlign: "right"}}>{item.name}</Text>}
              keyExtractor={item => item.name}
            />
          </View>
          <View style={{flex: 1, flexDirection: "row", width: fullWidth, justifyContent: "space-around", alignItems: 'baseline'}}>
            <Button
                onPress={() => {
                  this.reportResult(0, teams)
                  this.props.navigation.navigate('Leaderboard')
                }}
            >Win Team1</Button>
            <Button
                onPress={() => {
                  this.reportResult(1, teams)
                  this.props.navigation.navigate('Leaderboard')
                }}
            >Win Team2</Button>
          </View>
        </View>
      </Layout>
      </SafeAreaView>
    );
  }
}
const ConnectedGameScreen = connect(state => state)(GameScreen)

class LeaderboardEntry extends React.Component<{rank: number, name: string, points: number, active: boolean}, {}> {
  render() {
    return (
      <View style={styles.lbEntryContainer}>
        <Text category="h3">{this.props.rank.toString()}</Text>
        <View style={{flex: 1, marginLeft: 10}}><Text category="h3">{this.props.name}</Text></View>
        <Icon name={this.props.active ? 'checkmark-circle-2' : 'checkmark-circle-2-outline'} width={25} height={25} fill="#fff"/>
        <Text style={{marginLeft: 10}} category="h3">{this.props.points.toString()}</Text>
      </View>
    );
  }
}

const MainNavigator = createStackNavigator({
  Game: {screen: ConnectedGameScreen},
  NewGame: {screen: ConnectedNewGameScreen},
  Leaderboard: {screen: ConnectedLeaderboardScreen},
}, {initialRouteName: 'NewGame', headerMode: 'none'});

const Navigation = createAppContainer(MainNavigator);

const App = () => (
      <React.Fragment>
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider mapping={mapping} theme={darkTheme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Navigation />
            </PersistGate>
          </Provider>
        </ApplicationProvider>
      </React.Fragment>
  );

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
    alignItems: 'center',
    justifyContent: 'space-between',
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
