import React, { useState, useEffect } from 'react'
import { Surface } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { targetTime } from './App'

interface LightsProps {
  countdown: boolean,
  targetTime: targetTime,
}

let timerLightsTwo: NodeJS.Timeout
let timerLightsThree: NodeJS.Timeout

const Lights = (props:LightsProps) => {

  const [lightsOne, setLightsOne] = useState(false)
  const [lightsTwo, setLightsTwo] = useState(false)
  const [lightsThree, setLightsThree] = useState(false)

  useEffect(() => {
    if (props.countdown) {
      setLightsOne(true)
      timerLightsTwo = setTimeout(() => {
        setLightsTwo(true)
      }, 700)
      timerLightsThree = setTimeout(() => {
        setLightsThree(true)
      }, 1400)
    } else {
      clearTimeout(timerLightsTwo)
      clearTimeout(timerLightsThree)
      setLightsOne(false)
      setLightsTwo(false)
      setLightsThree(false)
    }
  }, [props.countdown, props.targetTime])

  return (
    <View style={styles.container}>
      <Surface style={[styles.lights,{ backgroundColor: props.targetTime ? '#00701a' : lightsOne ? '#ab000d' : '#e0e0e0'}]}>

      </Surface>
      <Surface style={[styles.lights,{ backgroundColor: props.targetTime ? '#00701a' : lightsTwo ? '#ab000d' : '#e0e0e0'}]}>
          
      </Surface>
      <Surface style={[styles.lights,{ backgroundColor: props.targetTime ? '#00701a' : lightsThree ? '#ab000d' : '#e0e0e0'}]}>
          
      </Surface>
    </View>
  )
}

const styles = StyleSheet.create({
  lights: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
})

export default Lights