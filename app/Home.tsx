'use client'

import CompactPostSlideshow from '@/components/CompactPostSlideshow'
import Link from '@/components/Link'
import PageViewTracker from '@/components/PageViewTracker'
import CardLayout from '@/layouts/CardLayout'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import { MouseEventHandler } from 'react'

const MAX_DISPLAY = 3

type Props = {
  posts: CoreContent<Blog>[]
}

function AllProjectsLink({ onClick }: { onClick?: MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <Link
      href="/projects"
      className="font-medium text-primary-500 hover:text-primary-400"
      aria-label="All posts"
      onClick={onClick}
    >
      All Projects &rarr;
    </Link>
  )
}

function AreaTitle({ title }: { title: string }) {
  return (
    <div className="tracking-tighttext-gray-100 py-2 text-3xl font-extrabold leading-9 sm:text-4xl sm:leading-10 md:py-5 md:text-5xl md:leading-14">
      {title}
    </div>
  )
}

export default function Home({ posts }: Props) {
  const { trackEvent } = useMatomo()

  return (
    <div>
      <PageViewTracker title="Home" />
      <div className="px-8 py-6 md:px-20 md:py-8 lg:py-16">
        <h1 className="text-center text-4xl font-extrabold sm:text-6xl">
          Hi,{' '}
          <Link
            href="/about"
            className="text-primary-500 hover:text-primary-400"
            onClick={() => trackEvent({ category: 'Home', action: 'click on my name' })}
          >
            I'm Max!
          </Link>
        </h1>
        <p className="text-center text-lg leading-9 text-gray-200 sm:text-2xl">
          Welcome to my site, where I share the stuff I create in my free time.
        </p>
      </div>

      <div className="hidden md:block">
        <AreaTitle title="Latest" />
        <CompactPostSlideshow posts={posts.slice(0, MAX_DISPLAY)} id="latest-posts" />
        <div className="mt-3 flex justify-end">
          <AllProjectsLink
            onClick={() => trackEvent({ category: 'Home', action: 'all projects [latest]' })}
          />
        </div>
        <AreaTitle title="My Favorites" />
        <CompactPostSlideshow
          posts={posts.filter((post) => post.favorite).reverse()}
          id="favorite-posts"
        />
        <div className="mt-3 flex justify-end">
          <AllProjectsLink
            onClick={() => trackEvent({ category: 'Home', action: 'all projects [favorites]' })}
          />
        </div>
      </div>

      <div className="px-3 sm:block md:hidden">
        <div className="mb-2 flex flex-row items-center justify-between">
          <AreaTitle title="My Favorites" />
          <AllProjectsLink
            onClick={() =>
              trackEvent({ category: 'Home', action: 'all projects [favorites, mobile]' })
            }
          />
        </div>
        <CardLayout posts={posts.filter((post) => post.favorite)} />
      </div>
    </div>
  )
}
