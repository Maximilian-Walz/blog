import Card from '@/components/Card'
import Link from '@/components/Link'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Latest
        </h1>
        {!posts.length && 'No posts found.'}
        <div className="-m-4 flex flex-wrap">
          {posts.slice(0, MAX_DISPLAY).map((post) => {
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
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
