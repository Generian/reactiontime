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

const defaultTargetTime: false | number = false

let timer: NodeJS.Timeout

export default function App() {

  const [lightsColor, setLightsColor] = useState('gray')
  const [targetTime, setTargetTime] = useState(defaultTargetTime)
  const [message, setMessage] = useState("")
  const [countdown, setCountdown] = useState(false)

  const startProcess = () => {
    setMessage("")
    setCountdown(true)
    setLightsColor('red')
    const random = 1400 + Math.random() * 5000

    timer = setTimeout(() => {
      setTargetTime(Date.now())
      setLightsColor('green')
    }, random)
  }

  const handleRelease = () => {
    clearTimeout(timer)
    const diff = targetTime && Date.now() - targetTime
    setTargetTime(false)
    setCountdown(false)
    setLightsColor('gray')

    if (diff) {
      setMessage(diff + ' ms')
    } else {
      setMessage("Too early!")
    }
  }

  return (
    <PaperProvider theme={theme}>
      <Appbar>
        
      </Appbar>
      <View style={styles.container}>
        <Lights countdown={countdown} green={targetTime ? true : false} />
        <View style={styles.textContainer}>
          <Message message={message} />
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
