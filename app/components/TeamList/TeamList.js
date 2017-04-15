/* @flow */

import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import styles from './styles'

export default class TeamList extends Component {
  renderItem = (text: string, i: number) => {
    return (
      <Text style={StyleSheet.flatten([styles.item,{backgroundColor: this.props.color}])} key={text}>{text}</Text>
    )
  }

  render() {
    const {list, title, color} = this.props

    return (
      <View>
        <View style={styles.header} backgroundColor={color}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View backgroundColor={color}>
          {list.map(this.renderItem)}
        </View>
      </View>
    )
  }
}
