import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { List, useTheme, Text, IconButton } from 'react-native-paper'
import { HighscoresContext } from './Main';

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

const Leaderboard = ({ navigation }) => {

  const highscores = useContext(HighscoresContext)

  return (
    <View style={styles.leaderboardContainer}>
      <IconButton
          icon="camera"
          size={20}
          onPress={() => navigation.pop()}
        />
      <Text>Leaderboard</Text>
      {highscores.highscores.map((time, index) => (
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