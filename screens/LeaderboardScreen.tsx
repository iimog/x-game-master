import React from "react";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import { Layout, Button, Text, List, ListItem, Icon, Tab, TabView } from "@ui-kitten/components";
import { Player, Round } from "../store";
import { connect } from 'react-redux';
import { ThemedSafeAreaView } from "../components/ThemedSafeAreaView";
import _ from "lodash";

class LeaderboardScreen extends React.Component<{navigation, dispatch, players: Array<Player>, rounds: Array<Round>, games: Array<string>},{selectedIndex: number}> {
    constructor(props) {
      super(props);
      this.state = {
        selectedIndex: 0,
      };
    }
    getPlayerScores: () => { [key: string]: number; } = () => {
      let playerScores = {};
      const {rounds, players} = this.props;
      players.map(x => playerScores[x.name] = 0);
      for(let i=0; i<rounds.length; i++){
        let round = rounds[i]
       if(round.winner in [0,1]){
          round.teams[round.winner].map(player => playerScores[player.name]+=(i+1));
       }
      }
      return playerScores;
    }
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
    render() {
      const {navigate} = this.props.navigation;
      const fullWidth = Dimensions.get('window').width;
      const gameIndex = this.props.rounds.length-1;
      const gameRunning = gameIndex >= 0 && this.props.rounds[gameIndex].winner == -1;
      let playerScores = this.getPlayerScores();
      let isOver = this.props.rounds.length >= this.props.games.length && !gameRunning;
      let sortedPlayers = this.props.players.sort((x,y) => playerScores[y.name]-playerScores[x.name])
      let lastScore = -1;
      let tieIndex = -1;
      let ranks = sortedPlayers.map((player,index) => {
        let thisScore = playerScores[player.name];
        if(thisScore == lastScore){
          return (tieIndex+1).toString();
        } else {
          lastScore = thisScore;
          tieIndex = index;
          return (index+1).toString();
        }
      });
      if(isOver){
        ranks = ranks.map(x => x=='1' ? '🏆' : x);
      }
      let remainingGames = _.shuffle(this.props.games.slice(this.props.rounds.length));
      return (
        <ThemedSafeAreaView>
              <TabView
      selectedIndex={this.state.selectedIndex}
      onSelect={(index) => this.setState({selectedIndex: index})}
      style={{flex: 1}}>
      <Tab title='Leaderboard'>
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: fullWidth, padding: 15}}> 
            <List
              data={sortedPlayers}
              renderItem={({item, index}) => {
                return(
                  <ListItem onPress={(index) => {
                    this.props.dispatch({type: 'TOGGLE_PLAYER', payload: sortedPlayers[index].name})
                  }}>
                    <LeaderboardEntry rank={ranks[index]} name={item.name} points={playerScores[item.name]} active={item.active}/>
                  </ListItem>
                )}
              }
              keyExtractor={item => item.name}
            />
          </View>
        </Layout>
      </Tab>
      <Tab title='Games'>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: fullWidth, padding: 15}}> 
            <List
              data={this.props.rounds}
              renderItem={({item, index}) => {
                return(
                  <ListItem key={index} onLongPress={(index) => {
                    Alert.alert(
                      'Rewrite history?',
                      'Change winner or remove (no undo for that)?',
                      [
                        {
                          text: 'Change winner',
                          onPress: () => this.props.dispatch({type: 'TOGGLE_GAME_RESULT', payload: index})
                        },
                        {
                          text: 'Remove',
                          onPress: () => this.props.dispatch({type: 'REMOVE_GAME', payload: index}),
                          style: 'destructive'
                        },
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                      ],
                      {cancelable: true},
                    );
                    
                  }}>
                      <GameListEntry gameIndex={index} name={item.game} winner={item.winner} teams={item.teams}/>
                  </ListItem>
                )}
              }
            />
            <Text category="h4" appearance="hint" style={{marginTop:25}}>{remainingGames.length>0 ? "Remaining games:" : ""}</Text>
            <List
              data={remainingGames}
              renderItem={({item, index}) => {
                return(
                  <ListItem key={index}>
                      <UnplayedGameListEntry name={item}/>
                  </ListItem>
                )}
              }
            />
          </View>
        </Layout>
      </Tab>
    </TabView>
    <Button onPress={() => {
                  if(isOver){
                    navigate('Main');
                  } else {
                    if(!gameRunning){
                      let teams = this.getRandomTeams(this.props.players)
                      this.props.dispatch({type: 'START_NEXT_GAME', payload: teams})
                    }
                    navigate('Game')
                  }
                }
              }>
              {isOver ? "Back to Main" : (gameRunning ? "Back to Game" : "Next Game")}
            </Button>
        </ThemedSafeAreaView>
      );
    }
  }
export default connect(state => state)(LeaderboardScreen)

class LeaderboardEntry extends React.Component<{rank: string, name: string, points: number, active: boolean}, {}> {
    render() {
      const appearance = this.props.active ? "default" : "hint";
      return (
        <View style={styles.lbEntryContainer}>
          <Text category="h3" appearance={appearance}>{this.props.rank}</Text>
          <View style={{flex: 1, marginLeft: 10}}><Text category="h3" appearance={appearance}>{this.props.name}</Text></View>
          <Text style={{marginRight: 10}} category="h3" appearance={appearance}>{this.props.points.toString()}</Text>
          <Icon name={this.props.active ? 'checkmark-circle-2' : 'checkmark-circle-2-outline'} width={25} height={25} fill="#fff"/>
        </View>
      );
    }
  }

class GameListEntry extends React.Component<{gameIndex: number, name: string, winner: number, teams: Array<Array<Player>>}, {}> {
    render() {
      const appearance = this.props.winner >= 0 ? "default" : "hint";
      return (
        <View style={styles.lbEntryContainer}>
          <Text category="h3" appearance={appearance}>{(this.props.gameIndex+1).toString()}.</Text>
          <View style={{flex: 2, marginLeft: 10}}><Text category="h3" appearance={appearance}>{this.props.name}</Text></View>
          <Text style={{flex: 1, marginRight: 10}}>
            { this.props.winner<0 ? '...running...' : this.props.teams[this.props.winner].map(x => x.name).join(", ")}
          </Text>
        </View>
      );
    }
  }

class UnplayedGameListEntry extends React.Component<{name: string}, {}> {
    render() {
      const appearance = "hint";
      return (
        <View style={styles.lbEntryContainer}>
          <Text category="h3" appearance={appearance}>?.</Text>
          <View style={{flex: 1, marginLeft: 10}}><Text category="h3" appearance={appearance}>{this.props.name}</Text></View>
        </View>
      );
    }
  }
  
const styles = StyleSheet.create({
    lbEntryContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });