import React from "react";
import { Image } from "react-native";
import { Layout, Button } from "@ui-kitten/components";
import { Round } from "../store";
import { connect } from 'react-redux';
import { ThemedSafeAreaView } from "../components/ThemedSafeAreaView";

class MainScreen extends React.Component<{navigation, rounds: Array<Round>},{}> {
    constructor(props) {
      super(props);
    }
    render() {
      const {navigate} = this.props.navigation;
      return (
        <ThemedSafeAreaView>
          <Layout style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
            <Image source={require('../assets/xmenu.png')} style={{width: 250, height: 200}}/>
            <Button onPress={() => {navigate('NewMatch')}}> New Match </Button>
            <Button onPress={() => {navigate('Leaderboard')}} disabled={this.props.rounds.length==0}> Continue </Button>
            <Button onPress={() => {navigate('About')}}> App Info </Button>
          </Layout>
        </ThemedSafeAreaView>
      );
    }
  }

  export default connect(state=>state)(MainScreen)
  