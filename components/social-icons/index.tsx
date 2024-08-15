'use client'

import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Mastodon,
  Reddit,
  Threads,
  Twitter,
  Youtube,
} from './icons'

import { motion } from 'framer-motion'

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  mastodon: Mastodon,
  threads: Threads,
  instagram: Instagram,
  reddit: Reddit,
}

export type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
  animDelay?: number
}

const SocialIcon = ({ kind, href, size = 8, animDelay = 0 }: SocialIconProps) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: animDelay, duration: 0.01, ease: 'anticipate' }}
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-200 hover:text-primary-400 h-${size} w-${size}`}
      />
    </motion.a>
  )
}

export default SocialIcon
