import { createInstance } from '@jonkoops/matomo-tracker-react'

export const matomoInstance = createInstance({
  urlBase: 'https://analytics.maximilian-walz.com',
  siteId: 1,
  configurations: {
    disableCookies: true,
    setSecureCookie: true,
  },
})
