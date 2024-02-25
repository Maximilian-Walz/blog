import CardCarousel from '@/components/CardCarousel'
import Link from '@/components/Link'

const MAX_DISPLAY = 6

export default function Home({ posts }) {
  return (
    <div>
      <h1 className="py-5 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        Latest
      </h1>
      <CardCarousel posts={posts.slice(0, MAX_DISPLAY)} />
      {posts.length > MAX_DISPLAY && (
        <div className="mt-3 flex justify-end text-base font-medium leading-6">
          <Link
            href="/projects"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Projects &rarr;
          </Link>
        </div>
      )}
      <h1 className="py-5 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        My Favorites
      </h1>
      <CardCarousel posts={posts.slice(0, MAX_DISPLAY).reverse()} />
      {posts.length > MAX_DISPLAY && (
        <div className="mt-3 flex justify-end text-base font-medium leading-6">
          <Link
            href="/projects"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Projects &rarr;
          </Link>
        </div>
      )}
    </div>
  )
}
