import React from "react";
import { Image } from "react-native";
import { Layout, Button, Text } from "@ui-kitten/components";
import { Round } from "../store";
import { ThemedSafeAreaView } from "../components/ThemedSafeAreaView";
import Constants from 'expo-constants';
import { NavigationStackScreenProps } from "react-navigation-stack";

class MainScreen extends React.Component<NavigationStackScreenProps & {rounds: Array<Round>},{}> {
    //constructor(props) {
    //  super(props);
    //}
    render() {
      const {navigate} = this.props.navigation;
      return (
        <ThemedSafeAreaView>
          <Layout style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
            <Image source={require('../assets/xmenu.png')} style={{width: 250, height: 200}}/>
            <Button onPress={() => {navigate('NewMatch')}}> New Match </Button>
            <Button onPress={() => {navigate('Matches')}}> Matches </Button>
            <Button onPress={() => {navigate('About')}}> App Info </Button>
            <Text appearance="hint">Version {Constants.manifest.version || "?"}</Text>
          </Layout>
        </ThemedSafeAreaView>
      );
    }
  }

export default MainScreen
  