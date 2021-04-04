import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useTheme } from 'react-native-paper'
import ClickableArea from './ClickableArea'
import Lights from './Lights'
import Message from './Message'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { doesQualify } from '../helpers/fetch'
import SubmitForm from './SubmitForm'
import { GameProps } from '../helpers/Navigation'

export type targetTime = false | number
export type diff = false | number

let timer: NodeJS.Timeout

const Game = ({ navigation }: GameProps) => {

  const { colors } = useTheme()

  const [targetTime, setTargetTime] = useState<targetTime>(false)
  const [countdown, setCountdown] = useState(false)
  const [diff, setDiff] = useState<diff>(false)

  const [openSubmitForm, setOpenSubmitForm] = useState<boolean>(false)
  const [rank, setRank] = useState<number>(0)


  useEffect(() => {
    if (diff && diff !== -1) {
      handleNewScore(diff)
    }
  }, [diff])

  const startProcess = () => {
    setDiff(false)
    setCountdown(true)
    const countdownTarget = 1400 + Math.random() * 5000

    timer = setTimeout(() => {
      setTargetTime(Date.now())
    }, countdownTarget)
  }

  const handleRelease = () => {
    clearTimeout(timer)
    setDiff(targetTime ? Date.now() - targetTime : -1)
    setTargetTime(false)
    setCountdown(false)
  }

  const handleNewScore = (newScore: number) => {
    doesQualify(newScore).then(res => {
      setOpenSubmitForm(res.qualifies && newScore !== -1)
      setRank(res.rank)
    })
  }

  return (
    <View style={[styles.gameContainer,{ backgroundColor: targetTime ? colors.lightGreen : countdown ? colors.lightRed : colors.background}]}>
      <View style={styles.navContainer}>
        <IconButton
          icon={() => (<FontAwesomeIcon icon={faTrophy} color={colors.primary} size={30}/>)}
          size={45}
          style={styles.navIcon}
          onPress={() => navigation.push('Leaderboard')}
        />
      </View>
      <View style={styles.textContainer}>
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
      {SubmitForm(openSubmitForm, setOpenSubmitForm, rank, diff)}
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
  navContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
  },
  navIcon: {
    margin: '5%'
  },
  textContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
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