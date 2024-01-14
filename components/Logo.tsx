'use client'

import LogoDark from '@/data/logo.svg'
import LogoLight from '@/data/logo_light.svg'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

const Logo = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return mounted && (theme === 'dark' || resolvedTheme === 'dark') ?
    <LogoDark /> : <LogoLight />
}

export default Logo
