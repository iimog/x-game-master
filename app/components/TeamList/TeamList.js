import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class TeamList extends Component {
  renderItem = (text, i) => {
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

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'whitesmoke',
    marginBottom: 0,
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  header: {
    backgroundColor: 'skyblue',
    padding: 15,
    borderBottomWidth: 1
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },
})
