import { Highscore } from "./fetch";

export const timeDifference = (previous: any, current: any = Date.now()) => {

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous

  if (elapsed < msPerMinute) {
      return 'just now';   
  }

  else if (elapsed < msPerHour) {
      const num = Math.round(elapsed/msPerMinute) 
      return num + ` minute${num == 1 ? '' : 's'} ago`;   
  }

  else if (elapsed < msPerDay ) {
      const num = Math.round(elapsed/msPerHour)
      return num + ` hour${num == 1 ? '' : 's'} ago`;   
  }

  else if (elapsed < msPerMonth) {
      const num = Math.round(elapsed/msPerDay)
      return num + ` day${num == 1 ? '' : 's'} ago`;   
  }

  else if (elapsed < msPerYear) {
      const num = Math.round(elapsed/msPerMonth)
      return num + ` month${num == 1 ? '' : 's'} ago`;   
  }

  else {
      const num = Math.round(elapsed/msPerYear)
      return num + ` year${num == 1 ? '' : 's'} ago`;   
  }
}

export const sortHighscores = (highscores: Highscore[]) => {
  const compare = ( a: Highscore, b: Highscore ) => {
    if ( a.time < b.time ) {
      return -1
    } else if ( a.time > b.time ) {
      return 1
    } else if (a.date < b.date) {
      return -1
    } else if (a.date > b.date) {
      return 1
    }
    return 0
  }
  
  return highscores.sort( compare )
}