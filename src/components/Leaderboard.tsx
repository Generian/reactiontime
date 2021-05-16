import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Text, IconButton, useTheme, Title, Headline, Caption, Subheading, ActivityIndicator } from 'react-native-paper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { getHighscores, Highscore } from '../helpers/fetch'
import { filterHighscores, sortHighscores, timeDifference } from '../helpers/utils'
import { LeaderboardProps } from '../helpers/Navigation'
import HighcoreTypeSwitcher, { HighscoreType } from './HighscoreTypeSwitcher'

interface HighscoreItemProps {
  item: {
    name: string,
    time: number,
    date: number,
  }
  index: number,
}

const HighscoreItem = ({ item, index }: HighscoreItemProps) => {
  return (
    <View nativeID={String(index)} style={styles.highscoreItemContainer}>
      <View style={styles.rankContainer}>
        <Subheading style={{color: '#00897b'}}>{index + 1}</Subheading>
      </View>
      <View style={styles.scoreContainer}>
        <Title>{`${item.time} ms`}</Title>
        <Text style={styles.time}>{`by ${item.name} ${timeDifference(item.date)}`}</Text>
      </View>
      <View style={styles.rankContainer}>

      </View>
    </View>
  )
}

const EmptyState = (refreshing: boolean) => {
  return (
    <View style={styles.titleContainer}>
      {refreshing && <ActivityIndicator animating={true} />}
      {!refreshing && <Caption>Could not find leaderboard</Caption>}
    </View>
  )
}

const Leaderboard = ({ navigation }: LeaderboardProps) => {

  const [highscores, setHighscores] = useState<Highscore[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(true)
  const [highscoreType, setHighscoreType] = useState<HighscoreType>('NORMAL')

  const { colors } = useTheme()

  useEffect(() => {
    setRefreshing(false)
    getHighscores()
      .then(h => {
        setHighscores(filterHighscores(sortHighscores(h), highscoreType))
        setRefreshing(false)
      })
  }, [highscoreType])

  return (
    <View style={styles.leaderboardContainer}>
      <View style={styles.navContainer}>
        <IconButton
          icon={() => (<FontAwesomeIcon icon={faChevronLeft} color={colors.primary} size={30}/>)}
          size={45}
          style={styles.navIcon}
          onPress={() => navigation.pop()}
        />
        <View style={styles.highscoreTypeSwitcher}>
          <HighcoreTypeSwitcher 
            highscoreType={highscoreType} 
            setHighscoreType={setHighscoreType}
          />
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Headline>Highscores</Headline>
      </View>
      <View style={styles.highscoresContainer}>
        <FlatList
          data={highscores}
          renderItem={HighscoreItem}
          refreshing={refreshing}
          ListEmptyComponent={EmptyState(refreshing)}
          style={styles.list}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  highscoreTypeSwitcher: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '7%',
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
  list: {
    flex: 1,
    width: '100%',
  },
  highscoreItemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    marginBottom: '2%',
  },
  rankContainer: {
    width: '15%',
    alignItems: 'center',
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  navIcon: {
    margin: '5%'
  },
  time: {
    color: 'gray'
  },
})

export default Leaderboard