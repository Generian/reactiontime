import React from 'react'
import { ToggleButton, useTheme } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

export type HighscoreType = "NORMAL" | "THREE_AVG"

interface HigscoreTypeSwitcherProps {
  highscoreType: HighscoreType
  setHighscoreType: React.Dispatch<any>
}

const HighcoreTypeSwitcher = ({highscoreType, setHighscoreType}: HigscoreTypeSwitcherProps) => {

  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <ToggleButton.Row
        onValueChange={value => setHighscoreType(value as HighscoreType)}
        value={highscoreType}
      >
        <ToggleButton icon="numeric-1-circle-outline" value="NORMAL" color={colors.primary}/>
        <ToggleButton icon="numeric-3-circle-outline" value="THREE_AVG" color={colors.primary}/>
      </ToggleButton.Row>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default HighcoreTypeSwitcher