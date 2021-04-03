import * as React from 'react'
import { Surface, Text, Avatar,useTheme } from 'react-native-paper'
import { Pressable, StyleSheet, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHandPointer } from '@fortawesome/free-regular-svg-icons'

interface ClickableAreaProps {
  onPressIn: any,
  onPressOut: any,
  isPressed: boolean,
}

const ClickableArea = (props: ClickableAreaProps) => {

  const { colors } = useTheme()

  return (
    <Surface style={styles.container}>
      <Pressable style={styles.pressable}
        onPressIn={props.onPressIn}
        onPressOut={props.onPressOut}>
          <View style={[styles.clickableArea,{ backgroundColor: props.isPressed ? colors.accent : '#fafafa', borderColor: props.isPressed ? colors.primary : '#eeeeee'}]}>
            <Avatar.Icon icon={() => (<FontAwesomeIcon icon={faHandPointer} color={colors.gray} size={30}/>)}/>
            <Text style={[styles.text,{ color: colors.text}]}>Touch and hold until lights turn green</Text>
          </View>
      </Pressable>
    </Surface>
  )
}

const styles = StyleSheet.create({
  clickableArea: {
    width: '95%',
    height: '95%',
    display: 'flex',
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 10,
  },
  container: {
    borderRadius: 10,
    width: '95%',
    height: '95%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 10,
  }
})

export default ClickableArea