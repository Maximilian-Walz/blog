import { motion } from 'framer-motion'
import Image from './Image'
import Link from './Link'
import Tag from './Tag'
import ImageSlideshow from './ImageSlideshow'

type Props = {
  id: string
  title: string
  description?: string
  images?: string[]
  href?: string
  tags?: string[]
  date?: string
}

const image = (title, images: string[]) =>
  images.length == 1 ? (
    <Image
      alt={title}
      src={images[0]}
      className="object-cover object-center transition-all duration-500 hover:scale-110"
      width={544}
      height={306}
    />
  ) : (
    <ImageSlideshow alt={title} images={images} width={544} height={306} changeInterval={10000} />
  )

const Card = ({ title, description, images, href, tags, date, id }: Props) => (
  <div className="break-inside-avoid">
    <motion.div className="items-center overflow-hidden rounded-xl" layoutId={`hero-image:${id}`}>
      {images &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            {image(title, images)}
          </Link>
        ) : (
          image(title, images)
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
