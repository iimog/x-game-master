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
import Button from '../../components/Button'
import ScoreBoard from '../../components/ScoreBoard'
import ProgressBoard from '../../components/ProgressBoard'
import styles from './styles'
import I18n from '../../i18n'

const mapStateToProps = (state) => ({matchSettings: state.matchSettings})

type myProps = {
  navigation: {
    navigate: any,
    state: {
      params: {
        score: Array<number>,
      }
    }
  },
  matchSettings: {
    numberOfGames: number
  },
}

class Score extends Component {
  static navigationOptions = {
    header: {visible: false},
  };
  props: myProps;
  state: {
    score: Array<number>,
  }
  constructor(props: myProps) {
    super(props)
    const {score} = props.navigation.state.params;
    this.state = {
      score: score
    }
  }

  componentWillMount(){
    const { score } = this.state
    const { navigate } = this.props.navigation
    let standing = [0,0];
    for(let i=0; i<score.length; i++){
      standing[score[i]] += (i+1)
    }
    if(standing[score[score.length-1]]>((1+this.props.matchSettings.numberOfGames)*this.props.matchSettings.numberOfGames)/4){
      navigate('FinalScore', {score: score})
    }
  }

  render() {
    const { score } = this.state
    const { navigate } = this.props.navigation
    let standing = [0,0];
    for(let i=0; i<score.length; i++){
      standing[score[i]] += (i+1)
    }

    return (
      <View style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.title}>
            {I18n.t('score')} {I18n.t('after')} {I18n.t('game')} {score.length}
          </Text>
          <ScoreBoard
            standing={standing}
          />
          <ProgressBoard
            score={score}
            numberOfGames={this.props.matchSettings.numberOfGames}
          />
        </View>
        <View>
          <Button
            text={I18n.t('nextGame')}
            onPress={() => navigate('Game', {score: score})}
          />
        </View>
      </View>
    );
  }
};

export default connect(mapStateToProps)(Score)
