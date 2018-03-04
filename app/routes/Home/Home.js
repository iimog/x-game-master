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
import { isMatchOver } from '../../lib'

const mapStateToProps = (state) => ({playedGames: state.playedGames, matchSettings: state.matchSettings})

class Home extends Component {
  constructor(props){
    super(props)
  }

  static navigationOptions = {
    header: null,
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image source={images.logo} style={styles.logo}/>
        <View style={styles.buttons}>
          <Button text={I18n.t('newGame')} onPress={() => {
            navigate("MatchSettings")
          }}></Button>
          <Button
            text={I18n.t('addGame')}
            onPress={()=>navigate("AddGame")}
          ></Button>
          <Button
            text={this.props.playedGames.length > 0 ? I18n.t('continueGame') : I18n.t('noContinueGame')}
            disabled={true /*does not work - our Button component uses TouchableHighlight*/}
            onPress={() => {
              if(this.props.playedGames.length > 0){
                if(this.props.matchSettings.playMode === PlayMode.CLUB){
                  navigate("ClubScore")
                } else if (this.props.matchSettings.playMode === PlayMode.CLASSIC){
                  navigate("Score")
                }
              }
            }}
          ></Button>
        </View>
      </View>
    );
  }
};

export default connect(mapStateToProps)(Home)
