import React, { useState, useEffect } from 'react'
import { Surface } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

let timerLightsTwo: NodeJS.Timeout
let timerLightsThree: NodeJS.Timeout

export default function Lights(props:any) {

    const [lightsOne, setLightsOne] = useState(false)
    const [lightsTwo, setLightsTwo] = useState(false)
    const [lightsThree, setLightsThree] = useState(false)
    const [green, setGreen] = useState(false)

    useEffect(() => {
        if (props.countdown) {
            if (props.green) {
                setGreen(true)
            } else {
                setLightsOne(true)
                timerLightsTwo = setTimeout(() => {
                    setLightsTwo(true)
                }, 700)
                timerLightsThree = setTimeout(() => {
                    setLightsThree(true)
                }, 1400)
            }
        } else {
            clearTimeout(timerLightsTwo)
            clearTimeout(timerLightsThree)
            setLightsOne(false)
            setLightsTwo(false)
            setLightsThree(false)
            setGreen(false)
        }
    }, [props.countdown, props.green])

    return (
        <View style={styles.container}>
            <Surface style={[styles.lights,{ backgroundColor: green ? '#00701a' : lightsOne ? '#ab000d' : '#e0e0e0'}]}>

            </Surface>
            <Surface style={[styles.lights,{ backgroundColor: green ? '#00701a' : lightsTwo ? '#ab000d' : '#e0e0e0'}]}>
                
            </Surface>
            <Surface style={[styles.lights,{ backgroundColor: green ? '#00701a' : lightsThree ? '#ab000d' : '#e0e0e0'}]}>
                
            </Surface>
        </View>
    )
}

const styles = StyleSheet.create({
    lights: {
        width: 70,
        height: 70,
        borderRadius: 35,
        margin: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
});