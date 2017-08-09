/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import Button from '../../components/Button';
import images from '../../config/images';
import styles from './styles'
import I18n from '../../i18n'
import { connect } from 'react-redux'
import { actionCreators, PlayMode } from '../../redux'

const mapStateToProps = (state) => ({})

class Home extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image source={images.logo} style={styles.logo}/>
        <View style={styles.buttons}>
          <Button text={I18n.t('classicMatch')} onPress={() => {
            this.props.dispatch(actionCreators.setPlayMode(PlayMode.CLASSIC))
            navigate("MatchSettings")
          }}></Button>
          <Button text={I18n.t('clubMatch')} onPress={() => {
            this.props.dispatch(actionCreators.setPlayMode(PlayMode.CLUB))
            navigate("MatchSettings")
          }}></Button>
        </View>
      </View>
    );
  }
};

export default connect(mapStateToProps)(Home)
