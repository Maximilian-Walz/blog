'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
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

  const prevImage = (e: React.MouseEvent<HTMLElement>) => {
    setImage(mod(currentSlideIndex - 1, images.length), e)
  }

  const nextImage = (e?: React.MouseEvent<HTMLElement>) => {
    setImage(mod(currentSlideIndex + 1, images.length), e)
  }

  useInterval(() => {
    if (changeInterval && Date.now() - lastChange > changeInterval && !hovering) {
      nextImage()
    }
  }, changeInterval)

  return (
    <div ref={hoverRef} className="relative overflow-hidden">
      <div className="absolute inset-0 flex justify-between self-center">
        <button aria-label="Previous image" onClick={prevImage} hidden={!hovering} className="z-10">
          {arrow('matrix(-1, 0, 0, 1, 0, 0)')}
        </button>
        <button aria-label="Next image" onClick={nextImage} hidden={!hovering} className="z-10">
          {arrow('')}
        </button>
      </div>
      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
        {[...Array(images.length)].map((_, i) => (
          <button key={i} onClick={(e) => setImage(i, e)}>
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
        className="flex transition duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
      >
        {images.map((image, i) => (
          <Image
            key={i}
            alt={alt}
            src={image}
            className="object-cover object-center transition-all duration-500 hover:scale-110"
            width={width}
            height={height}
          />
        ))}
      </div>
    </div>
  )
}
