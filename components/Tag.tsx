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
        ' text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
      }
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
