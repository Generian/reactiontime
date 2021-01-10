import React from 'react'
import { StyleSheet, View } from 'react-native'
import { List, useTheme, Text, IconButton } from 'react-native-paper'

interface LeaderboardProps {
  setScreen: any,
  highscores: any[],
}

interface HighscoreItemProps {
  position: number,
  time: string,
}

const HighscoreItem = (props: HighscoreItemProps) => (
  <View nativeID={String(props.position)}>
    <Text>{props.position}</Text>
    <Text>{props.time}</Text>
  </View>
);

export default function Leaderboard(props: LeaderboardProps) {

  const { colors } = useTheme()

  return (
    <View style={[styles.mainContainer,{ backgroundColor: colors.background}]}>
      {/* <IconButton
        icon="add-a-photo"
        size={20}
        onPress={props.setScreen('game')}
      /> */}
      {props.highscores.map((time, index) => (
        <HighscoreItem position={index + 1} time={time}/>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
