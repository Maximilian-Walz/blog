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
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <div className="-m-4 flex flex-wrap">
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
    </div>
  )
}
