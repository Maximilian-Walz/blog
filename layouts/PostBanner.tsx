'use client'

import Comments from '@/components/Comments'
import Image from '@/components/Image'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import type { Blog } from 'contentlayer/generated'
import { motion } from 'framer-motion'
import Bleed from 'pliny/ui/Bleed'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import { ReactNode } from 'react'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostMinimal({ content, next, prev, children }: LayoutProps) {
  const { trackEvent } = useMatomo()

  const { slug, title, images, date, tags } = content
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'

  return (
    <SectionContainer>
      <motion.article
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' } }}
      >
        <div>
          <div className="-mt-5 space-y-1 border-gray-700 pb-5 text-center">
            <div className="w-full">
              <Bleed>
                <motion.div
                  className="relative aspect-[2/1] w-full"
                  layoutId={`hero-image:${slug}`}
                >
                  <Image
                    src={displayImage}
                    alt={title}
                    fill
                    className="rounded-lg object-cover p-2 blur-xl"
                  />
                  <Image
                    priority
                    src={displayImage}
                    alt={title}
                    fill
                    className="absolute inset-0 rounded-xl object-cover"
                  />
                </motion.div>
                {tags && (
                  <motion.div className="flex flex-wrap pt-6" layoutId={`tags:${slug}`}>
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </motion.div>
                )}
              </Bleed>
            </div>
            <motion.div className="relative pt-10" layoutId={`title:${slug}`}>
              <PageTitle>{title}</PageTitle>
            </motion.div>
            <dl>
              <div>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-gray-400">
                  <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                </dd>
              </div>
            </dl>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' } }}
            className="prose prose-invert max-w-none py-4"
          >
            {children}
          </motion.div>
          {siteMetadata.comments && (
            <div className="pb-6 pt-6 text-center text-gray-300" id="comment">
              <Comments slug={slug} />
            </div>
          )}
          <footer>
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev && prev.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${prev.path}`}
                    className="text-primary-500 hover:text-primary-400"
                    aria-label={`Previous post: ${prev.title}`}
                    onClick={() => trackEvent({ category: 'Post interaction', action: 'prev' })}
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && next.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${next.path}`}
                    className="text-primary-500 hover:text-primary-400"
                    aria-label={`Next post: ${next.title}`}
                    onClick={() => trackEvent({ category: 'Post interaction', action: 'next' })}
                  >
                    {next.title} &rarr;
                  </Link>
                </div>
              )}
            </div>
          </footer>
        </div>
      </motion.article>
    </SectionContainer>
  )
}
