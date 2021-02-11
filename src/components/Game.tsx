import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useTheme } from 'react-native-paper'
import { Appbar } from 'react-native-paper'
import ClickableArea from './ClickableArea'
import Lights from './Lights'
import { HighscoresContext, StackParamList } from './Main'
import Message from './Message'
import { StackNavigationProp } from '@react-navigation/stack';

type GameScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Game'
>;

type GameProps = {
  navigation: GameScreenNavigationProp;
};

export type targetTime = false | number
export type diff = false | number

let timer: NodeJS.Timeout

const Game = ({ navigation }:GameProps) => {

  const { colors } = useTheme()
  const handle = useContext(HighscoresContext)

  const [targetTime, setTargetTime] = useState<targetTime>(false)
  const [countdown, setCountdown] = useState(false)
  const [diff, setDiff] = useState<diff>(false)

  useEffect(() => {
    if (diff && diff != -1) {
      handle.handle(diff)
    }
  }, [diff])

  const startProcess = () => {
    setDiff(false)
    setCountdown(true)
    const random = 1400 + Math.random() * 5000

    timer = setTimeout(() => {
      setTargetTime(Date.now())
    }, random)
  }

  const handleRelease = () => {
    clearTimeout(timer)
    setDiff(targetTime ? Date.now() - targetTime : -1)
    setTargetTime(false)
    setCountdown(false)
  }

  return (
    <View style={[styles.gameContainer,{ backgroundColor: targetTime ? colors.lightGreen : countdown ? colors.lightRed : colors.background}]}>
      <View style={styles.textContainer}>
        <IconButton
          icon="camera"
          size={20}
          onPress={() => navigation.push('Leaderboard')}
        />
        <Message target={targetTime} diff={diff}/>
      </View>
      <View style={styles.lightsContainer}>
        <Lights countdown={countdown} targetTime={targetTime} />
      </View>
      <View style={styles.clickableContainer}>
        <ClickableArea 
          onPressIn={startProcess}
          onPressOut={handleRelease}
          isPressed={countdown}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightsContainer: {
    flex: 2,
    width: '100%',
    marginBottom: '10%',
  },
  textContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  clickableContainer: {
    flex: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Game