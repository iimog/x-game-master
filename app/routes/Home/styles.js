/* @flow */
import { StyleSheet } from 'react-native';

const styles: StyleSheet.Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#414141',
  },
  logo: {
    width: 150,
    height: 121,
    margin: 20
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
});

export default styles;
