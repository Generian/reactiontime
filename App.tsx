import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { Appbar, useTheme } from 'react-native-paper'
import ClickableArea from './ClickableArea'
import Lights from './Lights'
import Message from './Message'

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      green: string;
      lightGreen: string;
      red: string;
      lightRed: string;
      background: string;
      gray: string;
    }
  }
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00897b',
    accent: '#4ebaaa',
    green: '#00701a',
    lightGreen: '#c8e6c9',
    red: '#d32f2f',
    lightRed: '#f5f5f5',
    gray: '#e0e0e0',
    background: '#f5f5f5',
    text: '#1b1b1b',
  },
}

export type targetTime = false | number
const defaultTargetTime: targetTime = false

export type diff = false | number
const defaultDiff: diff = false

let timer: NodeJS.Timeout

export default function App() {

  const colors = theme.colors

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
      <View style={[styles.mainContainer,{ backgroundColor: targetTime ? colors.lightGreen : countdown ? colors.lightRed : colors.background}]}>
        <View style={styles.textContainer}>
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
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
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
