import React from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import Main from './src/components/Main'

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      green: string;
      lightGreen: string;
      red: string;
      lightRed: string;
      background: string;
      gray: string;
    }
  }
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00897b',
    accent: '#4ebaaa',
    green: '#00701a',
    lightGreen: '#c8e6c9',
    red: '#d32f2f',
    lightRed: '#f5f5f5',
    gray: '#e0e0e0',
    background: '#f5f5f5',
    text: '#1b1b1b',
  },
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </PaperProvider>
  )
}
