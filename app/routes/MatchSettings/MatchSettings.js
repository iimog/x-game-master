/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { connect } from 'react-redux'
import { actionCreators } from '../../redux'
import Button from '../../components/Button';
import Input from '../../components/Input';
import I18n from '../../i18n'

const mapStateToProps = (state) => ({matchSettings: state.matchSettings})

class MatchSettings extends Component {
  static navigationOptions = {
    title: I18n.t('matchSettings'),
  };

  render() {
    const { matchSettings } = this.props
    const { navigate } = this.props.navigation

    return (
      <ScrollView>
        <Button
          text={I18n.t('start')}
          onPress={()=>{navigate('Game', {score: []})}}
        />
      </ScrollView>
    );
  }
};

export default connect(mapStateToProps)(MatchSettings)
