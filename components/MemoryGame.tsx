'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import cards from '@/data/dataCards.json'
import { Badge } from '@/components/ui/badge'
import { Sparkles, RotateCcw, Timer } from 'lucide-react'
import { Button } from './ui/button'

interface Card {
  id: number
  background: string
  isFlipped: boolean
}

const MemoryGame = () => {
  const [nowCards, setNowCards] = useState<Card[]>([])
  const [selectCards, setSelectCards] = useState<Card[]>([])
  const [hidden, setHidden] = useState<number[]>([])
  const [newGame, setNewGame] = useState<boolean>(false)
  const [seconds, setSeconds] = useState(0) 
  const [isActive, setIsActive] = useState(false) 
  const [isLocked, setIsLocked] = useState(false) 

  useEffect(() => {
    const shuffled = shuffleCards(cards)
    setNowCards(shuffled)
  }, [])

  useEffect(() => {
    if (hidden.length == 24) {
      setNewGame(true) 
      setIsActive(false)
      setNowCards(nowCards.map(card => ({...card, isFlipped: false})))
      setHidden([])
    }
  }, [hidden, nowCards])

  useEffect(() => {
    if (selectCards.length === 2) {
      const [firstCard, secondCard] = selectCards
      if (firstCard?.background === secondCard?.background) {
        setHidden((prevHidden) => [...prevHidden, firstCard.id, secondCard.id])
      }
    }
  }, [selectCards])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval)
    }
    return () => interval && clearInterval(interval)
  }, [isActive, seconds])

  const shuffleCards = (cards: Card[]) => {
    const shuffled = [...cards]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

    const handleCart = (id: number) => {
    if (selectCards.length >= 2 || nowCards.find(card => card.id === id)?.isFlipped) { // Sprawdzenie, czy karta jest już otwarta
      return
    }

    const newCards = nowCards.map((card: Card) => {
      if (card.id === id) {
        setSelectCards([...selectCards, card])
        return {
          ...card,
          isFlipped: true, // Ustawienie karty jako odwróconej
        }
      }
      return card
    })
    setNowCards(newCards)

    if (selectCards.length === 1) { // Jeśli otwieramy drugą kartę
      setIsLocked(true) // Zablokowanie możliwości klikania
      setTimeout(() => {
        const [firstCard] = selectCards
        if (firstCard.background !== newCards.find(card => card.id === id)?.background) {
          // Jeśli karty się nie zgadzają, odwróć je z powrotem
          setNowCards(nowCards.map((card) => ({
            ...card,
            isFlipped: false,
          })))
        } else {
          // Jeśli karty się zgadzają, dodaj je do ukrytych
          setHidden((prevHidden) => [...prevHidden, firstCard.id, id])
        }
        setSelectCards([]) // Resetowanie wybranych kart
        setIsLocked(false) // Odblokowanie kart
      }, 2000)
    }
  }

  const toggle = () => {
    setIsActive(!isActive)
  }

  const reset = () => {
    setSeconds(0)
    setIsActive(false)
  }
console.log(hidden)
  return (
    <div>
      <div className='text-center mb-4'>
        <h1 className='text-4xl text-yellow-500 font-bold mb-4 flex items-center justify-center gap-2'>
          <Sparkles className='' />
          Memory Game
        </h1>
        <div className='flex justify-center items-center gap-4 '>
          <Badge
            variant='secondary'
            className='flex items-center gap-2 text-lg px-6 py-[2px]'
          >
            <h1>{seconds}s</h1>
            <Timer className='w-4 h-4 mr-2' />
          </Badge>

          <Button
            className=''
            onClick={() => {
              setNewGame(true)
              toggle()
            }}
          >
            <RotateCcw className='w-4 h-4 mr-2' />
            {isActive ? 'Stop' : 'Start'}
          </Button>
          <Button onClick={reset}>Reset</Button>
        </div>
      </div>

      {newGame && (
        <div className='grid grid-cols-4 gap-4'>
          {nowCards.map((card: Card) => (
            <div
              key={card.id}
              className='w-32 h-32 border-2 rounded-lg overflow-hidden cursor-pointer'
              onClick={() => handleCart(card.id)}
              hidden={hidden.includes(card.id)}
             
            >
              <div className='relative w-full h-full'>
                {card.isFlipped ? (
                  <Image
                    src={card.background}
                    alt='card'
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover '
                  />
                ) : (
                  <div className='absolute top-0 left-0 w-full h-full  '>
                     <Image
                    src='/images/orc-connector.png'
                    alt='card'
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover bg-amber-400 '
                  />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MemoryGame
