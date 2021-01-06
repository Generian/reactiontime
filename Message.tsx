import * as React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Text } from 'react-native-paper'
import type { targetTime, diff } from './App'

interface MessageProps {
  target: targetTime,
  diff: diff,
}

let timer: NodeJS.Timeout

const Message = (props:MessageProps) => {

  const [message, setMessage] = useState("")

  useEffect(() => {
    if (props.diff) {
      if (props.diff == -1) {
        setMessage("Too early!")
      } else {
        setMessage(props.diff + ' ms')
      }
 
    } else {
      clearInterval(timer)
      setMessage("")
    }
  }, [props.diff, props.target])
  
  return (
    <Text>{message}</Text>
  )
}

export default Message