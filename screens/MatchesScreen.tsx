import { Layout, Text, List, ListItem, Icon } from "@ui-kitten/components";
import React from "react";
import { View, Dimensions, Alert } from "react-native";
import { connect, ConnectedProps } from 'react-redux';
import { ThemedSafeAreaView } from "../components/ThemedSafeAreaView";
import { State, actions, Match, Game } from "../store";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../App";

// necessary to convert games from String <=v1.0.0 to Game >=v1.1.0
function convertGameTypeFromStringInPlace(match: Omit<Match, 'games'> & { games: Array<string|Game> }){
  if(typeof match.games[0] === 'string'){
    match.games = match.games.map(x => {return {name: x.toString(), fixedPosition: false}})
  }
  if(typeof match.rounds[0]?.game === 'string'){
    match.rounds.map(x => x.game = {name: x.game.toString(), fixedPosition: false})
  }
}

class MatchesScreen extends React.Component<NativeStackScreenProps<RootStackParamList,"Matches"> & PropsFromRedux,{matches: [string, Match][]}> {
  constructor(props: any) {
    super(props);
    this.state = {
      matches: []
    };
    this.getMatches().then(m => this.setState({matches: m}));
  }
  loadMatch: (id: string) => void = async (id) => {
    const m = await AsyncStorage.getItem(id) || "";
    const match: Match = JSON.parse(m);
    // necessary to convert games from String <=v1.0.0 to Game >=v1.1.0
    convertGameTypeFromStringInPlace(match)
    this.props.loadMatch({
      players: match.players,
      games: match.games,
      rounds: match.rounds,
      lastChange: match.lastChange,
      matchId: parseInt(id.substr(7)),
    })
    this.props.navigation.navigate('Leaderboard');
  }
  removeMatch: (id: string) => void = async (id) => {
    await AsyncStorage.removeItem(id);
    // reset current match so it is not re-created if it was the deleted one
    this.props.reset()
    this.getMatches().then(m => this.setState({matches: m}));
  }
  getMatches = async () => {
    let matches: [string, Match][] = []
    try {
      let keys = await AsyncStorage.getAllKeys()
      let raw_matches = await AsyncStorage.multiGet(keys.filter(x => x.startsWith("@match:")))
      matches = raw_matches.map(x => [x[0], JSON.parse(x[1]||"") as Match])
      matches.sort((a,b) => b[1].lastChange - a[1].lastChange)
    } catch(e) {
      console.error(e)
    }
    return matches;
  }
  render() {
    const fullWidth = Dimensions.get('window').width;
    return (
      <ThemedSafeAreaView>
      <Layout style={{flex: 1}}>
        <View style={{flex: 1, width: fullWidth, justifyContent: "space-around", alignItems: "center", padding: 15}}>
          <Text category="h1">Matches</Text>
          <List data={this.state.matches} renderItem={({item}: {item: [string, Match]}) => {
              let key = item[0];
              let match = item[1];
                return(
                  <ListItem onPress={() => {
                    this.loadMatch(key)
                  }} onLongPress={() => {
                    Alert.alert(
                      'Remove Match?',
                      'This can not be undone',
                      [
                        {text: 'Remove', onPress: () => this.removeMatch(key), style: 'destructive'},
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                      ],
                      {cancelable: true},
                    );
                    
                    
                    }}>
                    <MatchEntry match={match}/>
                  </ListItem>
                )}} keyExtractor={x => x[0]}/> 
        </View>
      </Layout>
      </ThemedSafeAreaView>
    );
  }
}

const connector = connect((state: State) => state, actions)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(MatchesScreen)

class MatchEntry extends React.Component<{match: Match}, {}> {
  render() {
    const {rounds, players, lastChange, games} = this.props.match;
    const gameIndex = rounds.length-1;
    const gameRunning = gameIndex >= 0 && rounds[gameIndex].winner == -1;
    const isOver = rounds.length >= games.length && !gameRunning;
    const appearance = isOver ? "hint" : "default";
    const lastPlayed = new Date(lastChange).toDateString();
    const currentGame = gameIndex + (gameRunning ? 0 : 1)
    return (
      <View style={{flexDirection: "row", alignItems: 'center', justifyContent: 'space-between',}}>
        <Text category="h4" appearance={appearance}>{isOver ? '🏆' : currentGame+'/'+games.length}</Text>
        <View style={{flex: 1, marginLeft: 10}}><Text category="h4" appearance={appearance}>{lastPlayed}</Text></View>
        <Icon name='people-outline' width={30} height={30} fill="#fff"/>
        <Text category="h3" appearance={appearance}>{" "+players.length}</Text>
      </View>
    );
  }
}