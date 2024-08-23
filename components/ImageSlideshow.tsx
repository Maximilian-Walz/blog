'use client'

import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { SwipeEventData, useSwipeable } from 'react-swipeable'
import { useHover, useInterval } from 'usehooks-ts'
import Image from './Image'

interface Props {
  alt: string
  images: string[]
  width: number
  height: number
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

export default function ImageSlideshow({
  alt,
  images,
  width,
  height,
  changeInterval = null,
}: Props) {
  const { trackEvent } = useMatomo()
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
  const [currentViewFactor, setCurrentViewFactor] = useState<number>(0)
  const hoverRef = useRef(null)
  const hovering = useHover(hoverRef)

  const [lastChange, setLastChange] = useState<number>(Date.now())

  const handlers = useSwipeable({
    onSwiping: (eventData) => handleSwiping(eventData),
    onSwiped: (eventData) => handleSwiped(eventData),
  })

  const setImage = (slideIndex: number, e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation()
    e?.preventDefault()
    setLastChange(Date.now())
    setCurrentViewFactor(slideIndex)
    setCurrentSlideIndex(slideIndex)
  }

  const handleSwiping = (eventData: SwipeEventData) => {
    const width = (eventData.event.currentTarget as HTMLElement).clientWidth
    const percentage = eventData.deltaX / width
    setLastChange(Date.now())
    setCurrentViewFactor(Math.min(currentSlideIndex - percentage, images.length - 1))
  }

  const handleSwiped = (eventData: SwipeEventData) => {
    const width = (eventData.event.target as HTMLElement).clientWidth
    const percentage = eventData.deltaX / width
    if (Math.abs(percentage) > 0.5) {
      const currentImageIndex = currentSlideIndex - Math.round(percentage)
      setImage(Math.max(Math.min(currentImageIndex, images.length - 1), 0))
    } else {
      setCurrentViewFactor(currentSlideIndex)
    }
  }

  const prevImage = (e?: React.MouseEvent<HTMLElement>) => {
    setImage(mod(currentSlideIndex - 1, images.length), e)
    trackEvent({ category: 'Image slideshow', action: 'prev image click' })
  }

  const nextImage = (e?: React.MouseEvent<HTMLElement>, track?: boolean) => {
    setImage(mod(currentSlideIndex + 1, images.length), e)
    if (track) trackEvent({ category: 'Image slideshow', action: 'prev image click' })
  }

  const specificImage = (i: number, e?: React.MouseEvent<HTMLElement>) => {
    setImage(i, e)
    trackEvent({ category: 'Image slideshow', action: 'indicator click' })
  }

  useInterval(() => {
    if (changeInterval && Date.now() - lastChange > changeInterval && !hovering) {
      nextImage(undefined, false)
    }
  }, changeInterval)

  return (
    <div {...handlers} className="touch-none">
      <div ref={hoverRef} className="relative overflow-hidden">
        <div className="absolute inset-0 flex justify-between self-center">
          <button
            aria-label="Previous image"
            onClick={(e) => prevImage(e)}
            hidden={!hovering}
            className="z-10"
          >
            {arrow('matrix(-1, 0, 0, 1, 0, 0)')}
          </button>
          <button
            aria-label="Next image"
            onClick={(e) => nextImage(e, true)}
            hidden={!hovering}
            className="z-10"
          >
            {arrow('')}
          </button>
        </div>
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
          {[...Array(images.length)].map((_, i) => (
            <button key={i} onClick={(e) => specificImage(i, e)}>
              {i == currentSlideIndex && (
                <motion.div
                  layout
                  layoutId={`indicator-${alt}`}
                  className="absolute h-3 w-3 rounded-full bg-primary-500"
                />
              )}
              <div className="h-3 w-3 rounded-full  bg-gray-700 hover:bg-primary-400 active:bg-primary-500" />
            </button>
          ))}
        </div>
        <div
          className="flex transition ease-in-out"
          style={{
            transform: `translateX(-${currentViewFactor * 100}%)`,
            transitionDuration: currentViewFactor == currentSlideIndex ? '700ms' : '0s',
          }}
        >
          {images.map((image, i) => (
            <Image
              priority
              key={i}
              alt={alt}
              src={image}
              className="h-auto w-auto object-cover object-center transition-all duration-500 hover:scale-110"
              width={width}
              height={height}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
