/* @flow */
import { StyleSheet } from 'react-native';

const boardFontSize = 20;

const styles: StyleSheet.Styles = StyleSheet.create({
  board: {
    flexDirection: 'row'
  },
  rankText: {
    fontSize: boardFontSize,
    width: 30,
  },
  nameText: {
    fontSize: boardFontSize,
    flex: 1,
  },
  scoreText: {
    fontSize: boardFontSize,
    marginRight: 5,
  }
});


export default styles;
