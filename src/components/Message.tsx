import * as React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Text, useTheme } from 'react-native-paper'
import { StyleSheet, Vibration } from 'react-native'
import type { targetTime, diff } from './Main'

// Variables
const timerInterval = 10 // Update timer every 10 ms
const calibrationCycles = 100 // How often should we cycle to calibrate the timer?
let timerOffsetFactor = 1.7 // Actual time between render cycles

interface MessageProps {
  target: targetTime,
  diff: diff,
}

type message = string | number
const defaultMessage: message = ""

let timer: any
let calibrator: any

let count = 0
let calibrationCount = 0

const Message = (props:MessageProps) => {

  const { colors } = useTheme()

  const [message, setMessage] = useState(defaultMessage)
  const [calibrationMessage, setCalibrationMessage] = useState(defaultMessage)

  useEffect(() => {
    // Clear calibration interval
    setTimeout(() => {
      clearInterval(calibrator)
      timerOffsetFactor = (Date.now() - calibrationTime) / (calibrationCount * timerInterval)
      console.log("Calibrated offset factor: ", timerOffsetFactor)
    }, timerInterval*calibrationCycles)

    let calibrationTime = Date.now()
    calibrator = setInterval(() => {
      calibrationCount += 1
      setCalibrationMessage(String((calibrationCount*timerInterval*timerOffsetFactor/1000).toFixed(3)) + ' s')
    }, timerInterval)    
  }, [])

  useEffect(() => {
    if (props.diff) {
      if (props.diff == -1) {
        clearInterval(timer)
        count = 0
        setMessage("Jump start!")
        Vibration.vibrate([10])
      } else {
        clearInterval(timer)
        count = 0
        setMessage((props.diff/1000).toFixed(3) + ' s')
      }
    } else {
      if (props.target) {
        timer = setInterval(() => {
          count += 1
          setMessage(String((count*timerInterval*timerOffsetFactor/1000).toFixed(3)) + ' s')
        }, timerInterval)
      } else {
        count = 0
        clearInterval(timer)
        setMessage("")
      }
    }
  }, [props.diff, props.target])
  
  return (
    <Text style={[styles.timerMessage,{ color: colors.text}]}>{message}</Text>
  )
}

const styles = StyleSheet.create({
  timerMessage: {
    fontSize: 50,
    fontWeight: '500',
  },
});

export default Message