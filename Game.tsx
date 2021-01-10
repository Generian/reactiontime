import React from 'react'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, useTheme } from 'react-native-paper'
import ClickableArea from './ClickableArea'
import Lights from './Lights'
import Message from './Message'

interface GameProps {
  setScreen: any,
  sendNewScore: any,
}

export type targetTime = false | number
const defaultTargetTime: targetTime = false

export type diff = false | number
const defaultDiff: diff = false

let timer: NodeJS.Timeout

export default function Game(props: GameProps) {

  const { colors } = useTheme()

  const [targetTime, setTargetTime] = useState(defaultTargetTime)
  const [countdown, setCountdown] = useState(false)
  const [diff, setDiff] = useState(defaultDiff)

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
    const d = targetTime ? Date.now() - targetTime : -1
    setDiff(d)
    setTargetTime(false)
    setCountdown(false)
    d >= 0 && props.sendNewScore(d)
  }

  return (
    <View style={[styles.mainContainer,{ backgroundColor: targetTime ? colors.lightGreen : countdown ? colors.lightRed : colors.background}]}>
      <View style={styles.textContainer}>
        {/* <IconButton
          icon="add-a-photo"
          size={20}
          onPress={props.setScreen('leaderboard')}
        /> */}
        <Message target={targetTime} diff={diff}/>
      </View>
      <View style={styles.lightsContainer}>
        <Lights countdown={countdown} green={targetTime ? true : false} />
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
  mainContainer: {
    flex: 1,
    width: '100%',
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
