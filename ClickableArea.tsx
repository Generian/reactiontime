import * as React from 'react';
import { Surface, Text } from 'react-native-paper';
import { Pressable, StyleSheet, View } from 'react-native';

const ClickableArea = (props:any) => (
  <Surface style={styles.container}>
    <Pressable 
      onPressIn={props.onPressIn}
      onPressOut={props.onPressOut}>
        <View style={styles.clickableArea}>
          <Text>Touch and hold until lights turn green!</Text>
        </View>
    </Pressable>
  </Surface>
);

const styles = StyleSheet.create({
  clickableArea: {
    width: 400,
    height: 300,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 10,
  },
  container: {
    borderRadius: 10,
  }
});


export default ClickableArea;