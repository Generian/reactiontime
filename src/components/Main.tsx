import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import Game from './Game'
import Leaderboard from './Leaderboard'

export type StackParamList = {
  Game: undefined;
  Leaderboard: undefined;
}

type HighscoreItem = [number, number]

type HighscoreContextProp = {
  highscores: HighscoreItem[];
  handle: any;
}

const defaultHighscoresContextProp:HighscoreContextProp = {
  highscores: [],
  handle: () => {}
}

const Stack = createStackNavigator<StackParamList>();

const Header = () => {
  return (
    <Appbar>

    </Appbar>
  );
};

export const HighscoresContext = React.createContext<HighscoreContextProp>(defaultHighscoresContextProp)

const Main = () => {

  const [highscores, setHighscores] = useState<HighscoreItem[]>([])

  const handleNewScore = (newScore: number, date: number) => {
    let scores = highscores
    for (let i = 0; i < 10; i++) {
      if (!scores[i] || newScore < scores[i][0]) {
        scores.splice(i, i == 9 ? 1 : 0, [newScore, date])
        break;
      }
    }
    if (scores.length > 10) {
      scores = scores.slice(0, 10)
    }
    setHighscores(scores)
  }
  
  return (
    <HighscoresContext.Provider value={{highscores: highscores, handle: handleNewScore}}>
      <Stack.Navigator 
        initialRouteName="Game"
        headerMode="screen"
        screenOptions={{
          header: ({ scene, previous, navigation }) => (
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

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
})

export default Main