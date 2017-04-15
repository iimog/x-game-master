/* @flow */
import { StyleSheet } from 'react-native';

const styles: StyleSheet.Styles = StyleSheet.create({
  scoreBoardContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  scoreBoardNumberContainer: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    margin: 1,
  },
  standingText: {
    alignSelf: 'center',
    fontSize: 50,
  },
  container: {
    flexDirection: 'column'
  },
});

export default styles;
