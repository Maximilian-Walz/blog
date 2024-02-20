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

const image = (title, imgSrc) => (
  <Image
    alt={title}
    src={imgSrc}
    className="object-cover object-center transition-all duration-500 hover:scale-110"
    width={544}
    height={306}
  />
)

const Card = ({ title, description, imgSrc, href, tags, date }: Props) => (
  <div className="break-inside-avoid">
    <div className="items-center overflow-hidden rounded-xl">
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            {image(title, imgSrc)}
          </Link>
        ) : (
          image(title, imgSrc)
        ))}
    </div>
    <div className="p-4">
      <h2 className="text-2xl font-bold leading-8 tracking-tight">
        {href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
      {<p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>}
      <div className="my-2">
        {tags && (
          <div className="flex flex-wrap">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
)

export default Card
