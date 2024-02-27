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

  const showLeftMask = useTransform(scrollXProgress, (value) => value * 100)
  const showRightMask = useTransform(scrollXProgress, (value) => (1 - value) * 100)

  return (
    <div className="relative -mx-1">
      <div
        ref={carouselRef}
        className=" flex flex-row flex-nowrap gap-5 overflow-x-auto scrollbar-none"
      >
        {posts.map((post) => {
          const { slug, date, title, summary, tags, images } = post
          return (
            <motion.div
              key={slug}
              className="w-full flex-none sm:w-2/5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' } }}
            >
              <CompactCard
                id={slug}
                title={title}
                description={summary}
                imgSrc={images?.[0]}
                href={`/blog/${slug}`}
                tags={tags}
                date={date}
              />
            </motion.div>
          )
        })}
      </div>
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to left, transparent 98%, ${color})`,
          opacity: showLeftMask,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to right, transparent 98%, ${color})`,
          opacity: showRightMask,
        }}
      />
    </div>
  )
}
