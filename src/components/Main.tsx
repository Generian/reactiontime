import React from 'react'
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

const Main = () => {
  return (
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
    // <View style={styles.mainContainer}>
    //   <Appbar>
        
    //   </Appbar>
    //   <Game />
    // </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
})

export default Main