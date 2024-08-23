'use client'

import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { useEffect } from 'react'

type Props = {
  title: string
}

export default function PageViewTracker({ title }: Props) {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({ documentTitle: title })
  }, [trackPageView, title])

  return <></>
}
