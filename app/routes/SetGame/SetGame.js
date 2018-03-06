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

const mapStateToProps = (state) => ({collection: state.collection})

class SetGame extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.title : I18n.t('addGame'),
    }
  };
  constructor(props){
    super(props)
    this.gameID = this.props.navigation.state.params.gameID
    this.state = {
      name: "",
      instructions: "",
      bestOf: 5,
      activePlayers: 1,
      tiePossible: false,
      randomStarter: false,
    }
    if(this.gameID !== null){
      this.state = {...this.state, ...this.props.collection[this.gameID]}
      this.props.navigation.setParams({title: I18n.t('editGame')})
    } else {
      this.props.navigation.setParams({title: I18n.t('addGame')})
    }
  }

  render() {
    const backAction = NavigationActions.back();
    return (
      <View style={layout.container}>
        <TextInput
          placeholder={I18n.t('gameName')}
          value={this.state.name}
          onChangeText={(text) => this.setState({name: text})}
        />
        <TextInput
          multiline={true}
          numberOfLines={5}
          placeholder={I18n.t('gameDesc')}
          value={this.state.instructions}
          onChangeText={(text) => this.setState({instructions: text})}
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
          text={this.gameID === null ? I18n.t('addGame') : I18n.t('saveChanges')}
          onPress={()=>{
            if(this.state.name !== ""){
              let gameID = (this.gameID !== null) ? this.gameID : "custom/" + this.state.name
              let newGame = {
                name: this.state.name,
                instructions: this.state.instructions,
                bestOf: this.state.bestOf,
                activePlayers: this.state.activePlayers,
                tiePossible: this.state.tiePossible,
                randomStarter: this.state.randomStarter
              }
              this.props.dispatch(actionCreators.setGame(gameID, newGame))
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

export default connect(mapStateToProps)(SetGame)
