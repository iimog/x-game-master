import React from "react";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import { Layout, Button, Text, List, ListItem, Icon, Tab, TabView } from "@ui-kitten/components";
import { Player, Round, actions, Game } from "../store";
import { connect, ConnectedProps } from 'react-redux';
import { ThemedSafeAreaView } from "../components/ThemedSafeAreaView";
import _ from "lodash";
import { State } from '../store'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

class LeaderboardScreen extends React.Component<NativeStackScreenProps<RootStackParamList, "Leaderboard"> & PropsFromRedux, { selectedIndex: number }> {
  state = { selectedIndex: 0 }

  getPlayerScores = () => {
    let playerScores: { [player: string]: number } = {};
    const { rounds, players } = this.props;
    players.map(x => playerScores[x.name] = 0);
    for (let i = 0; i < rounds.length; i++) {
      let round = rounds[i]
      if (round.winner === 0 || round.winner === 1) {
        round.teams[round.winner].map(player => playerScores[player.name] += (i + 1));
      }
    }
    return playerScores;
  }
  getRandomTeams= (players: Array<Player>) => {
    let activePlayers = players.filter(p => p.active)
    let shuffledPlayers = _.shuffle(activePlayers);
    let splitPoint = Math.floor(activePlayers.length / 2)
    if (activePlayers.length % 2) {
      splitPoint += _.random();
    }
    let teams: [Player[], Player[]] = [shuffledPlayers.slice(0, splitPoint), shuffledPlayers.slice(splitPoint)]
    return teams;
  }
  render() {
    const { navigate } = this.props.navigation;
    const fullWidth = Dimensions.get('window').width;
    const gameIndex = this.props.rounds.length - 1;
    const gameRunning = gameIndex >= 0 && this.props.rounds[gameIndex].winner == -1;
    let playerScores = this.getPlayerScores();
    let isOver = this.props.rounds.length >= this.props.games.length && !gameRunning;
    let sortedPlayers = _.cloneDeep(this.props.players).sort((x, y) => playerScores[y.name] - playerScores[x.name])
    let lastScore = -1;
    let tieIndex = -1;
    let ranks = sortedPlayers.map((player, index) => {
      let thisScore = playerScores[player.name];
      if (thisScore == lastScore) {
        return (tieIndex + 1).toString();
      } else {
        lastScore = thisScore;
        tieIndex = index;
        return (index + 1).toString();
      }
    });
    if (isOver) {
      ranks = ranks.map(x => x == '1' ? '🏆' : x);
    }
    let remainingGamesWithIndex = this.props.games.map((x,i) => ({game:x, gameIndex:(i+1).toString()})).slice(this.props.rounds.length);
    let remainingFixedGames = remainingGamesWithIndex.filter(x => x.game.fixedPosition)
    let remainingRandomGames = remainingGamesWithIndex.filter(x => !x.game.fixedPosition)
    if(remainingRandomGames.length > 0){
      remainingRandomGames = _.shuffle(remainingRandomGames.map(x => ({...x, gameIndex:"?"})))
    }
    let remainingGames = [...remainingFixedGames, ...remainingRandomGames]
    return (
      <ThemedSafeAreaView>
        <TabView
          selectedIndex={this.state.selectedIndex}
          onSelect={(index) => {if(!isNaN(index)){this.setState({ selectedIndex: index })}}}
          style={{ flex: 1 }}>
          <Tab title='Leaderboard'>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: fullWidth, padding: 15 }}>
                <List
                  data={sortedPlayers}
                  renderItem={({ item, index }: {item: Player, index: number}) => {
                    return (
                      <ListItem onPress={() => {
                        this.props.togglePlayer(sortedPlayers[index].name)
                      }}>
                        <LeaderboardEntry rank={ranks[index]} name={item.name} points={playerScores[item.name]} active={item.active} />
                      </ListItem>
                    )
                  }
                  }
                  keyExtractor={item => item.name}
                />
              </View>
            </Layout>
          </Tab>
          <Tab title='Games'>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: fullWidth, padding: 15 }}>
                <List
                  data={this.props.rounds}
                  renderItem={({ item, index }: {item: Round, index: number}) => {
                    return (
                      <ListItem key={index} onLongPress={() => {
                        Alert.alert(
                          'Rewrite history?',
                          'Change winner or remove (no undo for that)?',
                          [
                            {
                              text: 'Change winner',
                              onPress: () => this.props.toggleGameResult({roundIndex: index})
                            },
                            {
                              text: 'Remove',
                              onPress: () => this.props.removeGame({roundIndex: index}),
                              style: 'destructive'
                            },
                            {
                              text: 'Cancel',
                              style: 'cancel',
                            },
                          ],
                          { cancelable: true },
                        );

                      }}>
                        <GameListEntry gameIndex={index} name={item.game.name} winner={item.winner} teams={item.teams} />
                      </ListItem>
                    )
                  }
                  }
                />
                <Text category="h4" appearance="hint" style={{ marginTop: 25 }}>{remainingGames.length > 0 ? "Remaining games:" : ""}</Text>
                <List
                  data={remainingGames}
                  renderItem={({ item, index }: { item: {game: Game, gameIndex: string}, index: number }) => {
                    return (
                      <ListItem key={index}>
                        <UnplayedGameListEntry gameIndex={item.gameIndex} name={item.game.name} />
                      </ListItem>
                    )
                  }
                  }
                />
              </View>
            </Layout>
          </Tab>
        </TabView>
        <Button onPress={() => {
          if (isOver) {
            navigate('Main');
          } else {
            if (!gameRunning) {
              let teams = this.getRandomTeams(this.props.players)
              this.props.startNextGame({teams})
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
const connector = connect((state: State) => state, actions)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(LeaderboardScreen)

class LeaderboardEntry extends React.Component<{ rank: string, name: string, points: number, active: boolean }, {}> {
  render() {
    const appearance = this.props.active ? "default" : "hint";
    return (
      <View style={styles.lbEntryContainer}>
        <Text category="h3" appearance={appearance}>{this.props.rank}</Text>
        <View style={{ flex: 1, marginLeft: 10 }}><Text category="h3" appearance={appearance}>{this.props.name}</Text></View>
        <Text style={{ marginRight: 10 }} category="h3" appearance={appearance}>{this.props.points.toString()}</Text>
        <Icon name={this.props.active ? 'checkmark-circle-2' : 'checkmark-circle-2-outline'} width={25} height={25} fill="#fff" />
      </View>
    );
  }
}

class GameListEntry extends React.Component<{ gameIndex: number, name: string, winner: -1|0|1, teams: Array<Array<Player>> }, {}> {
  render() {
    const appearance = this.props.winner >= 0 ? "default" : "hint";
    return (
      <View style={styles.lbEntryContainer}>
        <Text category="h3" appearance={appearance}>{(this.props.gameIndex + 1).toString()}.</Text>
        <View style={{ flex: 2, marginLeft: 10 }}><Text category="h3" appearance={appearance}>{this.props.name}</Text></View>
        <Text style={{ flex: 1, marginRight: 10 }}>
          {this.props.winner < 0 ? '...running...' : this.props.teams[this.props.winner].map(x => x.name).join(", ")}
        </Text>
      </View>
    );
  }
}

class UnplayedGameListEntry extends React.Component<{ gameIndex: string, name: string }, {}> {
  render() {
    const appearance = "hint";
    return (
      <View style={styles.lbEntryContainer}>
        <Text category="h3" appearance={appearance}>{this.props.gameIndex}.</Text>
        <View style={{ flex: 1, marginLeft: 10 }}><Text category="h3" appearance={appearance}>{this.props.name}</Text></View>
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