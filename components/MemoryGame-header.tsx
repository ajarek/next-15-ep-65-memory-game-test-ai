'use client'

import { Sparkles, Timer, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import TimerGame from './TimerGame'
import { useState } from 'react'


export function GameHeader({handleNewGame}:{handleNewGame: () => void}) {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);

  const start = () => setIsActive(true);
  const stop = () => setIsActive(false);
  const reset = () => {
      setIsActive(false);
      setTime(0); // resetuj czas
  };
  // Funkcja aktualizująca czas w stanie `time`
  const handleTick = (currentTime: number) => {
      setTime(currentTime);
  };
  return (
    <div className='text-center mb-2'>
      <h1 className='text-4xl font-bold mb-4 flex items-center justify-center gap-2'>
        <Sparkles className='text-yellow-500' />
        Memory Game
      </h1>
      <div className='flex justify-center items-center gap-4 '>
        <Badge
          variant='secondary'
          className='text-lg px-4 py-2'
        >
          <Timer className='w-4 h-4 mr-2' />
          
          <TimerGame isActive={isActive} onTick={handleTick} />
          <Button className='ml-2' onClick={stop}>Stop</Button>
          <Button className='ml-2' onClick={reset}>Reset</Button>
        </Badge>

        <Button className='' onClick={()=>{handleNewGame();start()}}>
          <RotateCcw className='w-4 h-4 mr-2' />
          New Game
        </Button>
      </div>
    </div>
  )
}
