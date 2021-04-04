import React from 'react'
import { Appbar } from 'react-native-paper'
import Game from './Game'
import Leaderboard from './Leaderboard'
import { HighscoresContext, Stack } from '../helpers/Navigation'

export type HighscoreItem = [number, number]

const Header = () => {
  return (
    <Appbar>

    </Appbar>
  )
}

const Main = () => {
  
  return (
    <HighscoresContext.Provider value={{handle: () => {}}}>
      <Stack.Navigator 
        initialRouteName="Game"
        headerMode="screen"
        screenOptions={{
          header: () => (
            <Header />
          ),
        }}
        >
          <Stack.Screen
            name="Game"
            component={Game}
            options={{ headerTitle: 'Game'}}
          />
          <Stack.Screen
            name="Leaderboard"
            component={Leaderboard}
            options={{ headerTitle: 'Leaderboard' }}
          />
      </Stack.Navigator>
    </HighscoresContext.Provider>
  )
}

export default Main