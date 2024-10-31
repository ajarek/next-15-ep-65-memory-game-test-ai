'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import cards from '@/data/dataCards.json'
interface Card {
  id: number
  background: string
  isFlipped: boolean
}

const MemoryGame = () => {
  const [nowCards, setNowCards] = useState<Card[]>([])

  useEffect(() => {
    const shuffled = shuffleCards(cards)
    setNowCards(shuffled)
  }, [])

  const shuffleCards = (cards: Card[]) => {
    const shuffled = [...cards]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const handleCart=(id:number)=>{
    const newCards=nowCards.map((card:Card)=>{
      if(card.id===id){
        return{
          ...card,
          isFlipped:!card.isFlipped
        }
      }
      return card

    })

    setNowCards(newCards)
  }

  return (
    <div className='grid grid-cols-4 gap-4'>
      {nowCards.map((card: Card) => (
        <div
          key={card.id}
          className='w-32 h-32 border-2 rounded-lg overflow-hidden'
          onClick={()=>handleCart(card.id)}
        >
          <div className='relative w-full h-full'>
            {card.isFlipped ? (
               <Image
               src={card.background}
               alt='card'
               fill
               className='object-cover '
             />
            ) : (
              <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MemoryGame
