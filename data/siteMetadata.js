/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Maximilian Walz',
  author: 'Maximilian Walz',
  headerTitle: 'Maximilian Walz',
  description: 'My personal blog.',
  language: 'en-us',
  theme: 'dark', // dark
  siteUrl: 'https://maximilian-walz.com',
  siteRepo: 'https://github.com/Maximilian-Walz/blog',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'contact@maximilian-walz.com',
  github: 'https://github.com/Maximilian-Walz',
  reddit: 'https://www.reddit.com/user/maximilian-walz',
  locale: 'en-US',
  analytics: {},
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: 'search.json', // path to load documents to search
    },
  },
}

module.exports = siteMetadata
