'use client'

import Link from '@/components/Link'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { useEffect } from 'react'

export default function NotFound() {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({ documentTitle: `404 [${location.pathname}]` })
  }, [trackPageView])

  return (
    <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
          Sorry, the requested page does not exist.
        </p>
        <Link
          href="/"
          className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-primary-600 focus:outline-none"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
}
