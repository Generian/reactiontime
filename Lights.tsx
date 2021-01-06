import React, { useState, useEffect } from 'react';
import { Surface, Text } from 'react-native-paper';
import { Pressable, StyleSheet, View } from 'react-native';

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
                console.log("starting")
                setLightsOne(true)
                timerLightsTwo = setTimeout(() => {
                    setLightsTwo(true)
                }, 700)
                timerLightsThree = setTimeout(() => {
                    setLightsThree(true)
                }, 1400)
            }
        } else {
            console.log("stopping")
            clearTimeout(timerLightsTwo)
            clearTimeout(timerLightsThree)
            setLightsOne(false)
            setLightsTwo(false)
            setLightsThree(false)
            setGreen(false)
        }
    }, [props.countdown, props.green]);

    return (
        <View style={styles.lightsContainer}>
            <Surface style={[styles.lights,{ backgroundColor: green ? 'green' : lightsOne ? 'red' : 'gray'}]}>

            </Surface>
            <Surface style={[styles.lights,{ backgroundColor: green ? 'green' : lightsTwo ? 'red' : 'gray'}]}>
                
            </Surface>
            <Surface style={[styles.lights,{ backgroundColor: green ? 'green' : lightsThree ? 'red' : 'gray'}]}>
                
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    lights: {
        width: 60,
        height: 60,
        borderRadius: 30,
        margin: 15,
    },
    lightsContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
});