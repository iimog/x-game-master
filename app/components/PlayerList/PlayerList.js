import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

export default class PlayerList extends Component {

  renderItem = (text, i) => {
    const {onPressItem} = this.props

    return (
      <TouchableOpacity
        style={styles.item}
        key={text}
        onPress={() => onPressItem(i)}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const {list} = this.props

    return (
      <View>
        {list.map(this.renderItem)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'whitesmoke',
    marginBottom: 5,
    padding: 15,
  },
  text: {
    color: '#444444',
    fontSize: 18,
    textAlign: 'center'
  },
})
