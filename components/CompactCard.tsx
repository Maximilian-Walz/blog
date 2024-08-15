import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
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

const CompactCard = ({ title, description, imgSrc, href, tags, date, id }: Props) => {
  const [hovering, setHovering] = useState(false)

  return (
    <Link href={href!} aria-label={`Link to ${title}`}>
      <div
        className="relative break-inside-avoid overflow-hidden rounded-xl"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' } }}
          className="items-center"
        >
          {imgSrc && (
            <Image
              alt={title}
              src={imgSrc}
              className={`${
                hovering && 'scale-110'
              } h-48 object-cover object-center transition-all duration-500 lg:h-64`}
              width={544}
              height={306}
            />
          )}
        </motion.div>
        <AnimatePresence>
          {hovering && (
            <motion.div
              className="absolute inset-0 p-4 backdrop-blur-sm backdrop-brightness-75"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-2xl font-bold leading-8 tracking-tight text-white">
                {href ? (
                  <Link
                    href={href}
                    aria-label={`Link to ${title}`}
                    className="hover:text-primary-400"
                  >
                    {title}
                  </Link>
                ) : (
                  title
                )}
              </h2>
              {<p className="prose mb-3 max-w-none text-gray-100">{description}</p>}
              <div className="my-2">
                {tags && (
                  <div className="flex flex-wrap gap-y-2">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  )
}

export default CompactCard
