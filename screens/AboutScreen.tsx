import React from "react";
import { Image, Linking, AsyncStorage } from "react-native";
import { ThemedSafeAreaView } from "../components/ThemedSafeAreaView"
import { Layout, Button, Text } from "@ui-kitten/components";
import { NavigationStackScreenProps } from "react-navigation-stack";

class AboutScreen extends React.Component<NavigationStackScreenProps,{}> {
    constructor(props: NavigationStackScreenProps) {
      super(props);
      this.getAllKeys()
    }
    getAllKeys = async () => {
      let keys: string[] = []
      try {
        keys = await AsyncStorage.getAllKeys()
      } catch(e) {
        // read key error
      }
    
      console.log(keys)
      // example console.log result:
      // ['@MyApp_user', '@MyApp_key']
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
                X Game Manager Website.{" "}
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