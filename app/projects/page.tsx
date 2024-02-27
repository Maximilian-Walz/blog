import TagRecords from '@/components/TagRecords'
import CardLayout from '@/layouts/CardLayout'
import { genPageMetadata } from 'app/seo'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  const posts = allCoreContent(sortPosts(allBlogs))

  return (
    <div>
      <h1 className="pt-2 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:pt-5 md:text-6xl md:leading-14">
        All Projects
      </h1>
      <TagRecords allCount={posts.length} />
      <CardLayout posts={posts} />
    </div>
  )
}
