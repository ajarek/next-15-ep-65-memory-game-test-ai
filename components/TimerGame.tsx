import React, { useState, useEffect } from 'react'

interface TimerGameProps {
  isActive: boolean
  onTick: (seconds: number) => void
}

function TimerGame({ isActive, onTick }: TimerGameProps) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
        onTick(seconds + 1) // Wywołaj `onTick`, aby przekazać czas do zewnętrznego komponentu
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval)
    }
    return () => interval && clearInterval(interval)
  }, [isActive, seconds, onTick])
  
  return (
    <div>
      <h1>{seconds}s</h1>
    </div>
  )
}

export default TimerGame
