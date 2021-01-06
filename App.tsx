import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { Text, Appbar } from 'react-native-paper'
import ClickableArea from './ClickableArea'
import Lights from './Lights'
import Message from './Message'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
}

export type targetTime = false | number
const defaultTargetTime: targetTime = false

export type diff = false | number
const defaultDiff: diff = false

let timer: NodeJS.Timeout

export default function App() {

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
    setDiff(targetTime ? Date.now() - targetTime : -1)
    setTargetTime(false)
    setCountdown(false)
  }

  return (
    <PaperProvider theme={theme}>
      <Appbar>
        
      </Appbar>
      <View style={styles.container}>
        <Lights countdown={countdown} green={targetTime ? true : false} />
        <View style={styles.textContainer}>
          <Message target={targetTime} diff={diff}/>
        </View>
        <View style={styles.clickableContainer}>
          <ClickableArea 
            onPressIn={startProcess}
            onPressOut={handleRelease}
          />
        </View>
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clickableContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clickableArea: {
    width: 400,
    height: 300,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: "center",
  }
})
