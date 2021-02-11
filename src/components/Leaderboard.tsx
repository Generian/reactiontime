import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import { HighscoresContext, StackParamList } from './Main'
import { StackNavigationProp } from '@react-navigation/stack';

type LeaderboardScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Leaderboard'
>

type LeaderboardProps = {
  navigation: LeaderboardScreenNavigationProp;
}

interface HighscoreItemProps {
  position: number,
  time: number,
}

const HighscoreItem = (props:HighscoreItemProps) => (
  <View nativeID={String(props.position)}>
    <Text>{props.position}</Text>
    <Text>{props.time}</Text>
  </View>
);

const Leaderboard = ({ navigation }:LeaderboardProps) => {

  const highscores = useContext(HighscoresContext)

  return (
    <View style={styles.leaderboardContainer}>
      <IconButton
          icon="camera"
          size={20}
          onPress={() => navigation.pop()}
        />
      <Text>Leaderboard</Text>
      {highscores.highscores.map(([time, str], index) => (
        <HighscoreItem key={index} position={index + 1} time={time}/>
      ))}
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