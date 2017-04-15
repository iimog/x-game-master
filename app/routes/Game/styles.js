/* @flow */
import { StyleSheet } from 'react-native';

const styles: StyleSheet.Styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 30
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  playerButtonView: {
    flex: 1,
    padding: 5
  },
  standingText: {
    alignSelf: 'center',
    fontSize: 72
  },
  content: {
    flex: 1,
  },
  main: {
    flex: 1,
    margin: 5,
  }
});

export default styles;
