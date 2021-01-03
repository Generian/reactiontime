import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const defaultTargetTime: false | number = false

let timer: NodeJS.Timeout

export default function App() {

  const [lightsColor, setLightsColor] = useState('gray')
  const [targetTime, setTargetTime] = useState(defaultTargetTime)
  const [message, setMessage] = useState("")

  const startProcess = () => {
    setMessage("")
    setLightsColor('red')
    const random = 2000 + Math.random() * 5000

    timer = setTimeout(() => {
      setTargetTime(Date.now())
      setLightsColor('green')
    }, random)
  }

  const handleRelease = () => {
    clearTimeout(timer)
    const diff = targetTime && Date.now() - targetTime
    setTargetTime(false)
    setLightsColor('gray')

    if (diff) {
      setMessage("difference: " + diff)
    } else {
      setMessage("Too early!")
    }
    
  }

  return (
    <View style={styles.container}>
      <View id="lights">
        <View style={[styles.lights,{ backgroundColor: lightsColor}]}></View>
      </View>
      <Text>{message}</Text>
      <StatusBar style="auto" />
      <Pressable 
        onPressIn={startProcess}
        onPressOut={handleRelease}>
        <View style={styles.clickableArea}>
          <Text>Touch and hold until lights turn green!</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lights: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  clickableArea: {
    width: 400,
    height: 300,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: "center",
  }
});
