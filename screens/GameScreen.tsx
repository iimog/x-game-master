import { Button, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { FlatList, View, Dimensions } from "react-native";
import { connect } from 'react-redux';
import { ThemedSafeAreaView } from "../components/ThemedSafeAreaView";
import { Player, Round } from "../store";

class GameScreen extends React.Component<{navigation, dispatch, players: Array<Player>, rounds: Array<Round>, games: Array<string>},{}> {
  reportResult: (index: number) => void = (index) => {
    this.props.dispatch({type: 'GAME_RESULT', payload: index})
  }
  gameIndex: number = this.props.rounds.length - 1;
  game: string = (this.gameIndex+1) + ". " +this.props.games[this.gameIndex];
  render() {
    const teams = this.props.rounds[this.gameIndex].teams;
    const fullWidth = Dimensions.get('window').width;
    return (
      <ThemedSafeAreaView>
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
                  this.reportResult(0)
                  this.props.navigation.navigate('Leaderboard')
                }}
            >Win Team1</Button>
            <Button
                onPress={() => {
                  this.reportResult(1)
                  this.props.navigation.navigate('Leaderboard')
                }}
            >Win Team2</Button>
          </View>
        </View>
      </Layout>
      </ThemedSafeAreaView>
    );
  }
}
export default connect(state => state)(GameScreen)
