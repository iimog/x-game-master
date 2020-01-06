import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, TextInput, Button, Alert } from 'react-native';

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      <View style={styles.container}> 
        <Text style={styles.title}>X</Text>
        <Text style={styles.label}>Spieler:</Text>
        <TextInput multiline={true} style={styles.inputArea}>Spieler A</TextInput>
        <Text style={styles.label}>Spiele:</Text>
        <TextInput multiline={true} style={styles.inputArea}>Spiel 1</TextInput>
        <Button
            title="Start"
            onPress={() => Alert.alert("Let's go!")}
          />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 32,
  },
  label: {
    fontSize: 20,
    marginVertical: 4,
  },
  inputArea: {
    backgroundColor: "#ddd",
    minWidth: 200,
  },
});
