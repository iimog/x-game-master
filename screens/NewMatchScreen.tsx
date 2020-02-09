import React from "react";
import { TouchableWithoutFeedback, Keyboard, Alert, Dimensions, AsyncStorage } from "react-native";
import { Layout, Button, Input, Text } from "@ui-kitten/components";
import { Player } from "../store";
import { connect } from 'react-redux';
import { ThemedSafeAreaView } from "../components/ThemedSafeAreaView";
import _ from "lodash";
import InputScrollView from "react-native-input-scroll-view";

class NewMatchScreen extends React.Component<{navigation, dispatch, matchId: number, players: Array<Player>, games: Array<string>},{playerText: string, gameText: string}> {
    constructor(props) {
      super(props);
      this.state = {
        playerText: this.props.players.map(p => p.name).join("\n"),
        gameText: this.props.games.join("\n"),
      };
    }
    getPlayersFromText: (text: string) => Array<Player> = (text) => {
      return text.split('\n').filter(x => x.trim().length>0).map((word) => {return {name: word, active: true}})
    }
    getDuplicatePlayers: (players: Array<Player>) => string[] = (players) => {
      return _.values(_.keys(_.pickBy(_.groupBy(players.map(x => x.name)), x => x.length > 1)))
    }
    render() {
      const {navigate} = this.props.navigation;
      const fullWidth = Dimensions.get('window').width
      return (
        <ThemedSafeAreaView>
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
                    let players = this.getPlayersFromText(this.state.playerText);
                    let duplicates = this.getDuplicatePlayers(players);
                    if(players.length < 2){
                      Alert.alert("It takes two to tango!")
                    }
                    if(duplicates.length > 0){
                      Alert.alert("Duplicate players: "+duplicates.join(", "));
                    } else {
                      this.props.dispatch({
                        type: 'START_MATCH',
                        payload: {
                          players: players,
                          games: _.shuffle(this.state.gameText.split('\n').filter(x => x.trim().length > 0))
                        }})
                        navigate('Leaderboard')
                      }}
                    }
                >Start</Button>
            </InputScrollView>
          </TouchableWithoutFeedback>
        </Layout></ThemedSafeAreaView>
      );
    }
  }
  export default connect(state=>state)(NewMatchScreen)