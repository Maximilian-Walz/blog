import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useHover, useInterval } from 'usehooks-ts'

const CARDS_PER_SLIDE = 3
const CARD_WIDTH = '1/3'

interface Props {
  cards: JSX.Element[]
  key: string
  changeInterval?: number | null
}

const mod = (n: number, m: number) => ((n % m) + m) % m

const arrow = (transform) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 330 330"
    fill="currentColor"
    className="h-10 w-10 text-gray-300 hover:text-primary-400 active:text-primary-500 dark:text-gray-700 dark:hover:text-primary-500 dark:active:text-primary-400"
    transform={transform}
  >
    <path d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21 l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001 c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z" />
  </svg>
)

export default function CardSlideshow({ cards, key, changeInterval = null }: Props) {
  const slidesAmount = Math.ceil(cards.length / CARDS_PER_SLIDE)
  const slideSwitching = slidesAmount > 1

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
  const hoverRef = useRef(null)
  const hovering = useHover(hoverRef)
  const [lastChange, setLastChange] = useState<number>(Date.now())

  const setImage = (slideIndex: number, e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation()
    e?.preventDefault()
    setLastChange(Date.now())
    setCurrentSlideIndex(slideIndex)
  }

  const prevCard = (e: React.MouseEvent<HTMLElement>) => {
    setImage(mod(currentSlideIndex - 1, slidesAmount), e)
  }

  const nextCard = (e?: React.MouseEvent<HTMLElement>) => {
    setImage(mod(currentSlideIndex + 1, slidesAmount), e)
  }

  useInterval(() => {
    if (changeInterval && Date.now() - lastChange > changeInterval) {
      nextCard()
    }
  }, changeInterval)

  return (
    <div ref={hoverRef} className="-mx-10">
      <div className="relative mx-8">
        <div className="absolute -inset-10 flex justify-between self-center">
          <button
            aria-label="Previous image"
            onClick={prevCard}
            hidden={!hovering || !slideSwitching}
            className="z-10"
          >
            {arrow('matrix(-1, 0, 0, 1, 0, 0)')}
          </button>
          <button
            aria-label="Next image"
            onClick={nextCard}
            hidden={!hovering || !slideSwitching}
            className="z-10"
          >
            {arrow('')}
          </button>
        </div>
        <div className="absolute -bottom-8 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
          {[...Array(slidesAmount)].map((_, i) => (
            <button key={i} onClick={(e) => setImage(i, e)} hidden={!slideSwitching}>
              {i == currentSlideIndex && (
                <motion.div
                  layoutId={`indicator-${key}`}
                  className="absolute h-3 w-3 rounded-full bg-primary-400 dark:bg-primary-500"
                />
              )}
              <div className="h-3 w-3 rounded-full bg-gray-300 hover:bg-primary-500 active:bg-primary-400 dark:bg-gray-700 dark:hover:bg-primary-400 dark:active:bg-primary-500" />
            </button>
          ))}
        </div>
        <div className="overflow-hidden">
          <div
            className="flex transition duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
          >
            {cards.map((card, i) => (
              <div key={i} className={`w-${CARD_WIDTH} flex-shrink-0 px-2`}>
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
