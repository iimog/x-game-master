import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from './styles'

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
