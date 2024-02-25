import { motion } from 'framer-motion'
import Image from './Image'
import Link from './Link'
import Tag from './Tag'

type Props = {
  id: string
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

const Card = ({ title, description, imgSrc, href, tags, date, id }: Props) => (
  <div className="break-inside-avoid">
    <motion.div className="items-center overflow-hidden rounded-xl" layoutId={`hero-image:${id}`}>
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            {image(title, imgSrc)}
          </Link>
        ) : (
          image(title, imgSrc)
        ))}
    </motion.div>
    <div className="p-4">
      <motion.h2 className="text-2xl font-bold leading-8 tracking-tight" layoutId={`title:${id}`}>
        {href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            {title}
          </Link>
        ) : (
          title
        )}
      </motion.h2>
      {<p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>}
      <motion.div className="my-2" layoutId={`tags:${id}`}>
        {tags && (
          <div className="flex flex-wrap gap-y-2">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  </div>
)

export default Card
