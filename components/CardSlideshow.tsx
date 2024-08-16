import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useHover, useInterval, useMediaQuery } from 'usehooks-ts'

interface Props {
  cards: JSX.Element[]
  id: string
  changeInterval?: number | null
}

const mod = (n: number, m: number) => ((n % m) + m) % m

const arrow = (transform) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 330 330"
    fill="currentColor"
    className="h-10 w-10 text-gray-700 hover:text-primary-500 active:text-primary-400"
    transform={transform}
  >
    <path d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21 l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001 c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z" />
  </svg>
)

export default function CardSlideshow({ cards, id, changeInterval = null }: Props) {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 640px)')
  const isMediumDevice = useMediaQuery('only screen and (max-width : 1280px)')
  const [slidesAmount, setSlidesAmount] = useState(0)

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
  const hoverRef = useRef(null)
  const hovering = useHover(hoverRef)
  const [lastChange, setLastChange] = useState<number>(Date.now())

  useEffect(() => {
    setSlidesAmount(Math.ceil(cards.length / (isSmallDevice ? 1 : isMediumDevice ? 2 : 3)))
    setCurrentSlideIndex(0)
  }, [isSmallDevice, isMediumDevice, cards.length])

  const setImage = (slideIndex: number, e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation()
    e?.preventDefault()
    setLastChange(Date.now())

    // On last slide, never show empty spots
    if (slideIndex == slidesAmount - 1) {
      const cardsPerSlide = Math.ceil(cards.length / slidesAmount)
      const cardsOnLastSlide = cards.length % cardsPerSlide
      if (cardsOnLastSlide > 0) {
        const emptyCards = cardsPerSlide - cardsOnLastSlide
        slideIndex = slideIndex - emptyCards / cardsPerSlide
      }
    }

    setCurrentSlideIndex(slideIndex)
  }

  const prevCard = (e: React.MouseEvent<HTMLElement>) => {
    setImage(mod(Math.ceil(currentSlideIndex - 1), slidesAmount), e)
  }

  const nextCard = (e?: React.MouseEvent<HTMLElement>) => {
    setImage(mod(Math.ceil(currentSlideIndex + 1), slidesAmount), e)
  }

  useInterval(() => {
    if (changeInterval && Date.now() - lastChange > changeInterval && !hovering) {
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
            hidden={!hovering || slidesAmount <= 1}
            className="z-10"
          >
            {arrow('matrix(-1, 0, 0, 1, 0, 0)')}
          </button>
          <button
            aria-label="Next image"
            onClick={nextCard}
            hidden={!hovering || slidesAmount <= 1}
            className="z-10"
          >
            {arrow('')}
          </button>
        </div>
        <div className="absolute -bottom-8 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
          {[...Array(slidesAmount)].map((_, i) => (
            <button key={i} onClick={(e) => setImage(i, e)} hidden={slidesAmount <= 1}>
              {i == Math.ceil(currentSlideIndex) && (
                <motion.div
                  layoutId={`indicator-${id}`}
                  className="absolute h-3 w-3 rounded-full bg-primary-500"
                />
              )}
              <div className="h-3 w-3 rounded-full bg-gray-700 hover:bg-primary-400 active:bg-primary-500" />
            </button>
          ))}
        </div>
        <div className="overflow-hidden">
          <div
            className="flex transition duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
          >
            {cards.map((card, i) => (
              <div key={i} className={`w-full flex-shrink-0 px-2 sm:w-1/2 xl:w-1/3`}>
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
