import CompactPostSlideshow from '@/components/CompactPostSlideshow'
import Link from '@/components/Link'

const MAX_DISPLAY = 3

export default function Home({ posts }) {
  return (
    <div>
      <h1 className="py-2 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:py-5 md:text-5xl md:leading-14">
        Latest
      </h1>
      <CompactPostSlideshow posts={posts.slice(0, MAX_DISPLAY)} key="latest-posts" />

      <div className="mt-3 flex justify-end text-base font-medium leading-6">
        <Link
          href="/projects"
          className="dark:hover:text-primary-40 text-primary-500 hover:text-primary-600"
          aria-label="All posts"
        >
          All Projects &rarr;
        </Link>
      </div>
      <h1 className="py-2 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:py-5 md:text-5xl md:leading-14">
        My Favorites
      </h1>
      <CompactPostSlideshow posts={posts.reverse()} key="favorite-posts" />
      <div className="mt-3 flex justify-end text-base font-medium leading-6">
        <Link
          href="/projects"
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          aria-label="All posts"
        >
          All Projects &rarr;
        </Link>
      </div>
    </div>
  )
}
