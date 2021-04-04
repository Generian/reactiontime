const BASE_URI = 'https://reactiontime-server.herokuapp.com'

export interface Highscore {
  date: number,
  id: string,
  name: string,
  time: number,
}

export const getHighscores = async () => {
  let highscores: Highscore[] = []

  try {
    const response = await fetch(`${BASE_URI}/api/highscores`, {
      method: 'GET',
    })
    const response_data = await response.json()
    console.log(response_data)

    highscores = response_data

  } catch {

  } finally {
    return highscores
  }
}

export const doesQualify = async (time: number) => {
  let res = {
    "qualifies": false,
    "rank": 0,
  }
  try {
    const body = JSON.stringify({
      "time": String(time)
    })
    const raw = await fetch(`${BASE_URI}/api/highscores/qualify`, {
      headers: {
        ["Content-Type"]: "application/json",
      },
      method: 'POST', 
      body: body,
    })
    const response = await raw.json()
    if (response) {
      res = response
    }
  } catch (err) {
    console.error(err)
  } finally {
    return res
  }
}

export const submitHighscore = async (time: number, name: string) => {
  let res = {
    "qualifies": false,
    "rank": 0,
  }
  try {
    const body = JSON.stringify({
      "time": String(time),
      "name": name,
    })
    const raw = await fetch(`${BASE_URI}/api/highscores`, {
      headers: {
        ["Content-Type"]: "application/json",
      },
      method: 'POST', 
      body: body,
    })
    const response = await raw.json()
    
  } catch (err) {
    console.error(err)
  }
}