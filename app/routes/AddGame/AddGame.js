/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
  Slider,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import Button from '../../components/Button';
import styles from './styles'
import I18n from '../../i18n'
import { connect } from 'react-redux'
import { actionCreators, PlayMode } from '../../redux'
import { isMatchOver } from '../../lib'
import layout from '../../layouts'

const mapStateToProps = (state) => ({})

class AddGame extends Component {
  static navigationOptions = {
    title: I18n.t('addGame'),
  };
  constructor(props){
    super(props)
    this.state = {
      name: "",
      instructions: "",
      bestOf: 5,
      activePlayers: 1,
      tiePossible: false,
      randomStarter: false,
    }
  }

  render() {
    const backAction = NavigationActions.back();
    return (
      <View style={layout.container}>
        <TextInput
          placeholder={I18n.t('gameName')}
          text={this.state.name}
          onChangeText={(text) => this.setState({name: text})}
        />
        <TextInput
          multiline={true}
          numberOfLines={5}
          placeholder={I18n.t('gameDesc')}
          text={this.state.description}
          onChangeText={(text) => this.setState({description: text})}
        />
        <Text>{I18n.t('bestOf') + ": " + this.state.bestOf}</Text>
        <Slider
          maximumValue={20}
          minimumValue={1}
          value={this.state.bestOf}
          step={1}
          onValueChange={(value) => this.setState({bestOf: value})}
        />
        <Text>{I18n.t('activePlayers') + ": " + this.state.activePlayers}</Text>
        <Slider
          maximumValue={5}
          minimumValue={0}
          value={this.state.activePlayers}
          step={1}
          onValueChange={(value) => this.setState({activePlayers: value})}
        />
        <View flexDirection="row" justifyContent="space-between">
          <Text>{I18n.t('tiePossible')}</Text>
          <Switch
            onValueChange={(value) => this.setState({tiePossible: value})}
            value={this.state.tiePossible}
          />
        </View>
        <View flexDirection="row" justifyContent="space-between">
          <Text>{I18n.t('randomStarter')}</Text>
          <Switch
            onValueChange={(value) => this.setState({randomStarter: value})}
            value={this.state.randomStarter}
          />
        </View>

        <Button
          text={I18n.t('addGame')}
          onPress={()=>{
            if(this.state.name !== ""){
              let gameID = "custom/" + this.state.name
              let newGame = {
                name: this.state.name,
                instructions: this.state.instructions,
                bestOf: this.state.bestOf,
                activePlayers: this.state.activePlayers,
                tiePossible: this.state.tiePossible,
                randomStarter: this.state.randomStarter
              }
              this.props.dispatch(actionCreators.addGame(gameID, newGame))
              this.props.navigation.dispatch(backAction)
            }else{
              Alert.alert( 'Error', "Du hast etwas vergessen! Finde den Fehler.", [ {text: 'Mach ich', onPress: () => {}} ], { cancelable: true } );
            }
          }}
        />
      </View>
    );
  }
};

export default connect(mapStateToProps)(AddGame)
