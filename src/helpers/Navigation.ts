import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import React from "react"

export type GameScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Game'
>

export type GameProps = {
  navigation: GameScreenNavigationProp;
}

export type LeaderboardScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Leaderboard'
>

export type LeaderboardProps = {
  navigation: LeaderboardScreenNavigationProp;
}

export type StackParamList = {
  Game: undefined;
  Leaderboard: undefined;
}

export type HighscoreContextProp = {
  handle: any;
}

const defaultHighscoresContextProp:HighscoreContextProp = {
  handle: () => {}
}

export const HighscoresContext = React.createContext<HighscoreContextProp>(defaultHighscoresContextProp)

export const Stack = createStackNavigator<StackParamList>()