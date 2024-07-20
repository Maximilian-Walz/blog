import CompactPostSlideshow from '@/components/CompactPostSlideshow'
import Link from '@/components/Link'
import { Blog } from 'contentlayer/generated'
import Bleed from 'pliny/ui/Bleed'
import { CoreContent } from 'pliny/utils/contentlayer'

const MAX_DISPLAY = 3

type Props = {
  posts: CoreContent<Blog>[]
}

export default function Home({ posts }: Props) {
  return (
    <div>
      <div className="px-2 py-16 sm:px-5 sm:py-24">
        <h1 className="text-center text-4xl font-extrabold sm:text-6xl">
          Hi,{' '}
          <Link href="/about" className="text-primary-500 hover:text-primary-400">
            I'm Max!
          </Link>
        </h1>
        <p className="text-center text-lg leading-9 text-gray-800 dark:text-gray-200 sm:text-2xl">
          Welcome to my site, where I share the stuff I create in my free time.
        </p>
      </div>
      <h1 className="py-2 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:py-5 md:text-5xl md:leading-14">
        Latest
      </h1>
      <CompactPostSlideshow posts={posts.slice(0, MAX_DISPLAY)} id="latest-posts" />

      <div className="mt-3 flex justify-end text-base font-medium leading-6">
        <Link
          href="/projects"
          className="text-primary-500 hover:text-primary-400"
          aria-label="All posts"
        >
          All Projects &rarr;
        </Link>
      </div>
      <h1 className="py-2 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:py-5 md:text-5xl md:leading-14">
        My Favorites
      </h1>
      <CompactPostSlideshow
        posts={posts.filter((post) => post.favorite).reverse()}
        id="favorite-posts"
      />
      <div className="mt-3 flex justify-end text-base font-medium leading-6">
        <Link
          href="/projects"
          className="text-primary-500 hover:text-primary-400"
          aria-label="All posts"
        >
          All Projects &rarr;
        </Link>
      </div>
    </div>
  )
}
