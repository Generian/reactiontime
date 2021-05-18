import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useTheme, Caption } from 'react-native-paper'
import ClickableArea from './ClickableArea'
import Lights from './Lights'
import Message from './Message'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { doesQualify } from '../helpers/fetch'
import { GameProps } from '../helpers/Navigation'
import SubmitForm from './SubmitForm'
import { DISABLE_TIMEOUT } from '../../config'
import { HighscoreType } from './HighscoreTypeSwitcher'


export type targetTime = false | number
export type diff = false | number
export type threeAvg = number[]

let timer: NodeJS.Timeout

const HighscoreTypes: HighscoreType[] = ["NORMAL", "THREE_AVG"]

const Game = ({ navigation }: GameProps) => {

  const { colors } = useTheme()

  const [targetTime, setTargetTime] = useState<targetTime>(false)
  const [countdown, setCountdown] = useState(false)
  const [diff, setDiff] = useState<diff>(false)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [threeAvg, setThreeAvg] = useState<threeAvg>([])

  const [openSubmitForm, setOpenSubmitForm] = useState<boolean>(false)
  const [openAvgSubmitForm, setOpenAvgSubmitForm] = useState<boolean>(false)

  const [rank, setRank] = useState<number>(0)
  const [avgRank, setAvgRank] = useState<number>(0)


  useEffect(() => {
    if (diff && diff !== -1) {
      handleNewScore(diff)
    }
  }, [diff])

  useEffect(() => {
    if (threeAvg.length === 3) {
      handleNewAvgScore(threeAvg)
    }
  }, [JSON.stringify(threeAvg)])

  const startProcess = () => {
    console.log("Start", targetTime, countdown, diff)
    setDiff(false)
    setCountdown(true)
    const countdownTarget = 1400 + Math.random() * 5000

    timer = setTimeout(() => {
      setTargetTime(Date.now())
    }, countdownTarget)
  }

  const handleRelease = () => {
    // Disable game if jump start
    if (!targetTime) {
      setDisabled(true)
      setTimeout(() => {
        setDisabled(false)
      }, DISABLE_TIMEOUT)
    }
    
    clearTimeout(timer)
    const newDiff = targetTime ? Date.now() - targetTime : -1
    setDiff(newDiff)
    setTargetTime(false)
    setCountdown(false)

    let newThreeAvg = threeAvg
    if (newDiff === -1) {
      newThreeAvg = []
    } else {
      if (threeAvg.length < 3) {
        newThreeAvg.push(newDiff)
      } else {
        newThreeAvg.shift()
        newThreeAvg.push(newDiff)
      }
    }
    setThreeAvg(newThreeAvg)
  }

  const calculateAverage = (threeAvg: threeAvg) => {
    if (threeAvg.length < 2) {
      return 0
    } else {
      return Math.ceil(threeAvg.reduce((accumulator, currentValue) => accumulator + currentValue) / threeAvg.length)
    }
  }

  const handleNewScore = (newScore: number) => {
    doesQualify(newScore, "NORMAL").then(res => {
      setOpenSubmitForm(res.qualifies && newScore !== -1)
      setRank(res.rank)
    })
  }

  const handleNewAvgScore = (threeAvg: threeAvg) => {
    const avg = calculateAverage(threeAvg)
    avg > 0 && doesQualify(avg, "THREE_AVG").then(res => {
      setOpenAvgSubmitForm(res.qualifies && avg !== -1)
      setAvgRank(res.rank)
    })
  }

  return (
    <View style={[styles.gameContainer,{ backgroundColor: targetTime ? colors.lightGreen : colors.background}]}>
      <View style={styles.navContainer}>
        <IconButton
          icon={() => (<FontAwesomeIcon icon={faTrophy} color={colors.primary} size={30}/>)}
          size={45}
          style={styles.navIcon}
          onPress={() => navigation.push('Leaderboard')}
        />
        <View style={styles.averageContainer}>
          <IconButton
            icon="numeric-3-circle-outline"
            color={colors.primary}
            size={30}
            onPress={() => {}}
            disabled={true}
          />
          {threeAvg.length === 3 && <Caption style={styles.averageText}>{calculateAverage(threeAvg)} ms</Caption>}
          {threeAvg.length < 3 && <Caption style={styles.averageText}>{threeAvg.length === 0 ? "1st try" : threeAvg.length === 1 ? "2nd try" : "3rd try"}</Caption>}
        </View>
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
          disabled={disabled}
        />
      </View>
      {SubmitForm(openSubmitForm, setOpenSubmitForm, rank, diff, "NORMAL")}
      {SubmitForm(openAvgSubmitForm, setOpenAvgSubmitForm, avgRank, calculateAverage(threeAvg), "THREE_AVG")}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  averageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '7%',
  },
  averageText: {

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