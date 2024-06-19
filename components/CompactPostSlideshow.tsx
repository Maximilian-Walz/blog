'use client'
import { Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import CardSlideshow from './CardSlideshow'
import CompactCard from './CompactCard'

type CompactPostSlideshowProps = {
  posts: CoreContent<Blog>[]
  key: string
}

export default function CompactPostSlideshow({ posts, key }: CompactPostSlideshowProps) {
  return (
    <CardSlideshow
      key={key}
      changeInterval={10000}
      cards={posts.map((post) => {
        const { slug, date, title, summary, tags, images } = post
        return (
          <CompactCard
            key={slug}
            id={slug}
            title={title}
            description={summary}
            imgSrc={images?.[0]}
            href={`/blog/${slug}`}
            tags={tags}
            date={date}
          />
        )
      })}
    />
  )
}
