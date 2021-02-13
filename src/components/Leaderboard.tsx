import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, IconButton, useTheme, Title, Headline } from 'react-native-paper'
import { HighscoresContext, StackParamList } from './Main'
import { StackNavigationProp } from '@react-navigation/stack'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen'

type LeaderboardScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Leaderboard'
>

type LeaderboardProps = {
  navigation: LeaderboardScreenNavigationProp;
}

interface HighscoreItemProps {
  position: number,
  time: number,
  date: number,
}

const timeDifference = (previous: any, current: any = Date.now()) => {

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous

  if (elapsed < msPerMinute) {
      return 'just now';   
  }

  else if (elapsed < msPerHour) {
      const num = Math.round(elapsed/msPerMinute) 
      return num + ` minute${num == 1 ? '' : 's'} ago`;   
  }

  else if (elapsed < msPerDay ) {
      const num = Math.round(elapsed/msPerHour)
      return num + ` hour${num == 1 ? '' : 's'} ago`;   
  }

  else if (elapsed < msPerMonth) {
      const num = Math.round(elapsed/msPerDay)
      return num + ` day${num == 1 ? '' : 's'} ago`;   
  }

  else if (elapsed < msPerYear) {
      const num = Math.round(elapsed/msPerMonth)
      return num + ` month${num == 1 ? '' : 's'} ago`;   
  }

  else {
      const num = Math.round(elapsed/msPerYear)
      return num + ` year${num == 1 ? '' : 's'} ago`;   
  }
}

const HighscoreItem = (props:HighscoreItemProps) => (
  <View nativeID={String(props.position)} style={styles.highscoreItemContainer}>
    <Title>{`${props.time} ms`}</Title>
    <Text style={styles.time}>{timeDifference(props.date)}</Text>
  </View>
);

const Leaderboard = ({ navigation }:LeaderboardProps) => {
  
  const { colors } = useTheme()
  const highscores = useContext(HighscoresContext)

  return (
    <View style={styles.leaderboardContainer}>
      <View style={styles.navContainer}>
        <IconButton
          icon={() => (<FontAwesomeIcon icon={faChevronLeft} color={colors.primary} size={30}/>)}
          size={45}
          style={styles.navIcon}
          onPress={() => navigation.pop()}
        />
      </View>
      <View style={styles.titleContainer}>
        <Headline>Highscores</Headline>
      </View>
      <View style={styles.highscoresContainer}>
        {highscores.highscores.map(([time, date], index) => (
          <HighscoreItem key={index} position={index + 1} time={time} date={date}/>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  leaderboardContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  highscoresContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '5%',
  },
  highscoreItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2%',
  },
  navIcon: {
    margin: '5%'
  },
  time: {
    color: 'gray'
  },
})

export default Leaderboard