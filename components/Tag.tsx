import Link from 'next/link'
import { slug } from 'github-slugger'
import { propagateServerField } from 'next/dist/server/lib/render-server'
interface Props {
  text: string
  leftAlign?: boolean
}

const Tag = ({ text, leftAlign = true }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className={
        (leftAlign ? 'mr-3' : 'ml-3') +
        ' me-2 rounded-full bg-primary-400 px-2.5 py-0.5 text-xs font-medium text-primary-600 hover:text-primary-700 dark:bg-primary-600 dark:text-primary-400 dark:hover:text-primary-300'
      }
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
