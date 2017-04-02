import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class TeamList extends Component {
  renderItem = (text, i) => {
    return (
      <Text style={styles.item} key={text}>{text}</Text>
    )
  }

  render() {
    const {list, title, color} = this.props

    return (
      <View>
        <View style={styles.header} backgroundColor={color}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          {list.map(this.renderItem)}
        </View>
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
  header: {
    backgroundColor: 'skyblue',
    padding: 15,
  },
  title: {
    textAlign: 'center',
    color: 'white',
  },
})
