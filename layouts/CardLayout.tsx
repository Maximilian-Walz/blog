'use client'

import Card from '@/components/Card'
import type { Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import { motion } from 'framer-motion'

interface CardLayoutProps {
  posts: CoreContent<Blog>[]
}

export default function CardLayout({ posts }: CardLayoutProps) {
  return (
    <div className="columns-1 gap-10 sm:columns-2">
      {!posts.length && 'No posts found.'}
      {posts.map((post) => {
        const { slug, date, title, summary, tags, images } = post
        return (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' } }}
            key={slug}
            className="pb-8"
          >
            <Card
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
  )
}
