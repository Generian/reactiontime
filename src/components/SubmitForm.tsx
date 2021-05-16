import React, { useState, useEffect } from 'react'
import { Button, Paragraph, Dialog, Portal, TextInput } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { diff } from './Game'
import { submitHighscore } from '../helpers/fetch'
import { getNameFromStorage, storeNameInStorage } from '../helpers/LocalStorage'
import { HighscoreType } from './HighscoreTypeSwitcher'


const SubmitForm = (openSubmitForm: boolean, setOpenSubmitForm: (b: boolean) => void, rank: number, newScore: diff, highscoreType: HighscoreType) => {

  const [name, setName] = useState<string>('')

  useEffect(() => {
    getNameFromStorage().then(name => {
      if (name !== null) {
        setName(name)
      }
    })
  }, [])

  const hideDialog = () => setOpenSubmitForm(false)

  const handleSubmit = () => {
    if (newScore && name) {
      storeNameInStorage(name)
      submitHighscore(newScore, name, highscoreType)
    } else {
      console.error('Missing data to submit score')
    }
    hideDialog()
  }

  return (
    <View>
      <Portal>
        <Dialog visible={openSubmitForm} onDismiss={hideDialog}>
          <Dialog.Title>New Highscore!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{`Congratultions! You just achieved the top ${rank} best reaction time ever. Go ahead and claim your spot on the leaderboard!`}</Paragraph>
            <Paragraph>{`Your time: ${newScore} ms`}</Paragraph>
            <TextInput
              label="Name"
              mode="outlined"
              style={styles.input}
              value={name}
              dense={true}
              onChangeText={text => setName(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button 
              disabled={!name}
              onPress={handleSubmit}
            >
              Submit
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
  }
})

export default SubmitForm