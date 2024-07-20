import { slug } from 'github-slugger'
import Link from 'next/link'

interface Props {
  text: string
  leftAlign?: boolean
  active?: boolean
  href?: string
}

export const formatTag = (tag: string) =>
  tag.replaceAll('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())

const Tag = ({ text, leftAlign = true, active = true, href }: Props) => {
  return (
    <Link
      href={href || `/tags/${slug(text)}`}
      className={`
        ${leftAlign ? 'mr-3' : 'ml-3'}
        ${
          active
            ? 'bg-primary-400 text-primary-700 hover:text-primary-200 dark:bg-primary-700 dark:text-primary-400 dark:hover:text-primary-300'
            : 'bg-primary-600 text-primary-400 hover:text-primary-300 dark:bg-primary-900 dark:text-primary-600  dark:hover:text-primary-400'
        }
         me-2 rounded-full  px-2.5 py-0.5 text-xs font-medium 
      `}
    >
      {formatTag(text)}
    </Link>
  )
}

export default Tag
