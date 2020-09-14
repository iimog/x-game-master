import React from "react";
import { TouchableWithoutFeedback, Keyboard, Alert, Dimensions, AsyncStorage, View } from "react-native";
import { Layout, Button, Input, Text, Icon } from "@ui-kitten/components";
import { Player, State, actions, Game } from "../store";
import { connect, ConnectedProps } from 'react-redux';
import { ThemedSafeAreaView } from "../components/ThemedSafeAreaView";
import _ from "lodash";
import InputScrollView from "react-native-input-scroll-view";
import { NavigationStackScreenProps } from "react-navigation-stack";

class NewMatchScreen extends React.Component<NavigationStackScreenProps & PropsFromRedux,{playerText: string, gameText: string}> {
    constructor(props: NavigationStackScreenProps & PropsFromRedux) {
      super(props);
      this.state = {
        playerText: this.props.players.map(p => p.name).join("\n"),
        gameText: this.props.games.map((x,i)=>(x.fixedPosition ? `${i+1}. ` : "") + x.name).join("\n"),
      };
    }
    getGamesFromText: (text: string) => Array<Game> = (text) => {
      let gameNames = _.shuffle(text.split('\n').filter(x => x.trim().length > 0))
      let games = gameNames.map(x => {return {name: x, fixedPosition: false}})
      let game2position: { [name: string] : number; } = {}
      let gamesWithPos = gameNames.filter(x => /^\d+\. /.test(x))
      gamesWithPos.map(x => game2position[x] = parseInt(x.match(/^(\d+)\. /)![1]))
      const isUniq = (a: Array<string|number>) => _.uniq(a).length == a.length 
      if(gamesWithPos.length > 0){
        let positions = Object.values(game2position)
        let noDuplicates = isUniq(positions) && isUniq(gamesWithPos)
        let rangeOk = _.max(positions)! <= gameNames.length
        if(noDuplicates && rangeOk){
          const gamesNoPos = _.difference(gameNames, gamesWithPos)
          const unusedPos = _.difference(_.range(1,gameNames.length+1), positions)
          games = Array(gameNames.length)
          gamesWithPos.map(x => games[game2position[x]-1] = {name: x.substr(x.indexOf(" ")+1), fixedPosition: true})
          gamesNoPos.map((x,index) => games[unusedPos[index]-1] = {name: x, fixedPosition: false})
        } else {
          let reason = noDuplicates ? "position out of range" : "collission"
          Alert.alert(`Fixed game positions detected but could not respect it: ${reason}`);
        }
      }
      return games
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
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text category="h3">Players</Text>
                <TouchableWithoutFeedback onPress={() => Alert.alert("Players","Enter all players: one per line.\nFeel free to use emojis 😈")}>
                  <Icon name="question-mark-circle" width={32} height={32} fill="#fff"/>
                </TouchableWithoutFeedback>
              </View>
              <Input multiline={true} scrollEnabled={false} onChangeText={(text) => this.setState({playerText: text})} value={this.state.playerText}></Input>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text category="h3">Games</Text>
                <TouchableWithoutFeedback onPress={() => 
                    Alert.alert(
                      "Games",
                      "Enter all games you want to play: one per line. This app does not contain any games you have to play all the games in real life. Keep in mind that you play each game in two teams. Popular choices include:\nDarts 🎯\nLiar's dice 🎲\nBlack Jack 🃏\nSnake 🐍\nTron 🏍\nBlobby Volley 🏐")
                  }>
                  <Icon name="question-mark-circle" width={32} height={32} fill="#fff"/>
                </TouchableWithoutFeedback>
              </View>
              <Input multiline={true} scrollEnabled={false} onChangeText={(text) => this.setState({gameText: text})} value={this.state.gameText}></Input>
              <Button
                  onPress={() => {
                    let players = this.getPlayersFromText(this.state.playerText);
                    let duplicates = this.getDuplicatePlayers(players);
                    let games = this.getGamesFromText(this.state.gameText);
                    if(players.length < 2){
                      Alert.alert("It takes two to tango!")
                    } else if(duplicates.length > 0){
                      Alert.alert("Duplicate players: "+duplicates.join(", "));
                    }  else if(games.length == 0){
                      Alert.alert("Please enter at least one game!");
                    } else {
                      this.props.startMatch({
                          players: players,
                          games: games,
                        })
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
const connector = connect((state: State) => state, actions)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(NewMatchScreen)