'use client'

import CompactCard from '@/components/CompactCard'
import type { Blog } from 'contentlayer/generated'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from 'next-themes'
import { CoreContent } from 'pliny/utils/contentlayer'
import { useEffect, useRef, useState } from 'react'

type CardCarouselProps = {
  posts: CoreContent<Blog>[]
}

export default function CardCarousel({ posts }: CardCarouselProps) {
  const carouselRef = useRef(null)
  const theme = useTheme()
  const [color, setColor] = useState('#ffffff')
  const { scrollXProgress } = useScroll({
    container: carouselRef,
  })

  useEffect(() => {
    setColor(theme.theme === 'dark' ? '#0C0C0E' : '#ffffff')
  }, [theme])

  const showLeftMask = useTransform(scrollXProgress, (value) => value * 10)
  const showRightMask = useTransform(scrollXProgress, (value) => (1 - value) * 10)

  return (
    <div className="relative -mx-2">
      <div
        ref={carouselRef}
        className=" flex flex-row flex-nowrap gap-5 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-800"
      >
        {posts.map((post) => {
          const { slug, date, title, summary, tags, images } = post
          return (
            <div key={slug} className="w-full flex-none pb-5 sm:w-2/5">
              <CompactCard
                id={slug}
                title={title}
                description={summary}
                imgSrc={images?.[0]}
                href={`/blog/${slug}`}
                tags={tags}
                date={date}
              />
            </div>
          )
        })}
      </div>
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to left, transparent 90%, ${color})`,
          opacity: showLeftMask,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to right, transparent 90%, ${color})`,
          opacity: showRightMask,
        }}
      />
    </div>
  )
}
