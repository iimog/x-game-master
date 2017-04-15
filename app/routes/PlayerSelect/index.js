import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import MyButton from '../../../MyButton';
import Input from '../../../Input';
import List from '../../../List';

export class PlayerSelect extends Component {
  static navigationOptions = {
    title: "New Game",
  };
  state = {
    players: ['Hannah', 'Markus', 'Tobi', 'Lo', 'Moritz'],
  };

  onAddPlayer = (text) => {
    const {players} = this.state
    if(players.indexOf(text) > -1){
      Alert.alert( 'Info', `Player ${text} already exists`, [ {text: 'OK', onPress: () => {}} ], { cancelable: true } )
    } else  {
      this.setState({
        players: [text, ...players],
      })
    }
  }

  onRemovePlayer = (index) => {
    const {players} = this.state

    this.setState({
      players: players.filter((player, i) => i !== index),
    })
  }

  render() {
    const {players} = this.state
    const { navigate } = this.props.navigation

    return (
      <ScrollView>
        <Input
          onSubmitEditing={this.onAddPlayer}
          style={styles.input}
          placeholder='Add players... Remove by tapping on them.'
        />
        <List
          list={players}
          onPressItem={this.onRemovePlayer}
        />
        <MyButton
          text="Select Teams"
          onPress={()=>navigate('Team', {players: players})}
        />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({

});
