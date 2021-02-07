import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import Game from './Game'

export default function Main() {

  return (
    <View style={styles.mainContainer}>
      <Appbar>
        
      </Appbar>
      <Game />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
})