'use client'

import Card from '@/components/Card'
import type { Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
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
          <Card
            key={slug}
            title={title}
            description={summary}
            imgSrc={images?.[0]}
            href={`/blog/${slug}`}
            tags={tags}
            date={date}
          />
        )
      })}
    </div>
  )
}
