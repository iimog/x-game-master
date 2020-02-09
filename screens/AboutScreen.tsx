import React from "react";
import { Image, Linking } from "react-native";
import { ThemedSafeAreaView } from "../components/ThemedSafeAreaView"
import { Layout, Button, Text } from "@ui-kitten/components";

class AboutScreen extends React.Component<{navigation},{}> {
    constructor(props) {
      super(props);
    }
    render() {
      const {navigate} = this.props.navigation;
      return (
        <ThemedSafeAreaView>
          <Layout style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
            <Image source={require('../assets/xmenu.png')} style={{width: 250, height: 200}}/>
            <Text category="h3">About X</Text>
            <Text>
              For a description of how to play the game please see: <Text style={{color: 'blue'}}
              onPress={() => Linking.openURL('https://github.com/iimog/x-game-master')}>
                X Game Manager Website
              </Text>
              This app is open source, please report bugs and suggestions at the website as well.
              
              Data Privacy: 
              This app does not collect any user data.
  Nor does it share any user information with any third party.
            </Text>
            <Button onPress={() => {navigate('Main')}}> Back </Button>
          </Layout>
        </ThemedSafeAreaView>
      );
    }
  }

  export default AboutScreen;