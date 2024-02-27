'use client'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import Logo from './Logo'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'
import ThemeSwitch from './ThemeSwitch'
import { motion } from 'framer-motion'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

function NavLink({ href, title }) {
  const [hovering, setHovering] = useState(false)
  const pathname = usePathname()

  const active = pathname === href

  return (
    <motion.div onHoverStart={() => setHovering(true)} onHoverEnd={() => setHovering(false)}>
      <Link
        href={href}
        className="relative hidden font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-500 sm:block"
      >
        {title}
        {active && (
          <motion.div
            className={`absolute inset-0 bottom-0 text-transparent underline ${
              hovering ? 'decoration-primary-500' : 'decoration-gray-900 dark:decoration-gray-100'
            }`}
            layoutId="underline"
          >
            {title}
          </motion.div>
        )}
      </Link>
    </motion.div>
  )
}

const Header = () => {
  return (
    <header className="flex items-center justify-between py-1 md:py-5">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Logo />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
