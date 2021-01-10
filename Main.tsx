import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Game from './Game'
import Leaderboard from './Leaderboard'

type Screen = 'game' | 'leaderboard'
const defaultScreen: Screen = 'leaderboard'

export default function Main() {

  const [screen, setScreen] = useState(defaultScreen)
  const [highscores, setHighscores] = useState([201, 300])

  const handleNewScore = (newScore: number) => {
    let scores = highscores
    for (let i = 0; i < scores.length; i++) {
      if (scores.length < 10) {
        scores.push(newScore)
      } else if (newScore < scores[i]) {
        scores.splice(i, i = 9 ? 1 : 0, newScore)
      }
    }
    setHighscores(scores)
  }

  let game = <Game setScreen={setScreen} sendNewScore={handleNewScore}/>
  let leaderboard = <Leaderboard setScreen={setScreen} highscores={highscores}/>

  let content

  switch(screen) {
    case 'game':
      content = game
      break
    case 'leaderboard':
      content = leaderboard
      break
    default:
      content = game
  }

  console.log(screen)


  return (
    <View style={styles.mainContainer}>
      {content}
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
