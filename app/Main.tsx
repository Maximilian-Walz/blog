import Link from '@/components/Link'
import CardLayout from '@/layouts/CardLayout'

const MAX_DISPLAY = 6

export default function Home({ posts }) {
  return (
    <>
      <CardLayout posts={posts} title="Latest" initialDisplayPosts={posts.slice(0, MAX_DISPLAY)} />
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/projects"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Projects &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
