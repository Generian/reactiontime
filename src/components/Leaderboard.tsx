import React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useTheme } from 'react-native-paper'
import { Appbar } from 'react-native-paper'
import ClickableArea from './ClickableArea'
import Lights from './Lights'
import Message from './Message'

export type targetTime = false | number
export type diff = false | number

let timer: NodeJS.Timeout

const Leaderboard = ({ navigation }) => {
  return (
    <View style={styles.leaderboardContainer}>
      <IconButton
          icon="camera"
          size={20}
          onPress={() => navigation.pop()}
        />
      <Text>Leaderboard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  leaderboardContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Leaderboard