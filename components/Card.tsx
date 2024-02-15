import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Image from './Image'
import Link from './Link'
import Tag from './Tag'

type Props = {
  title: string
  description?: string
  imgSrc?: string
  href?: string
  tags?: string[]
  date?: string
}

const Card = ({ title, description, imgSrc, href, tags, date }: Props) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={
        'h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700'
      }
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6 py-4">
        <div className="mb-4">
          {tags && (
            <div className="flex flex-wrap">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          )}
        </div>
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  </div>
)

export default Card
