import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import Game from './Game'
import Leaderboard from './Leaderboard';

const Stack = createStackNavigator();

const Header = () => {
  return (
    <Appbar>
    </Appbar>
  );
};

export const HighscoresContext = React.createContext({highscores: [0, 0], handle: (x: any) => {return x}});

const Main = () => {

  const [highscores, setHighscores] = useState([201, 300])

  const handleNewScore = (newScore: number) => {
    let scores = highscores
    for (let i = 0; i < scores.length; i++) {
      if (scores.length < 10) {
        scores.push(newScore)
      } else if (newScore < scores[i]) {
        scores.splice(i, i = 9 ? 1 : 0, newScore)
      }
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