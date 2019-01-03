const sm = require('sitemap')
const { getLastModifiedDate } = require('./util')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const sitemap = sm.createSitemap({
  hostname: process.env.SITE_ROOT || 'https://www.valentingurkov.com',
  cacheTime: 600000 // 600 sec - cache purge period
})

const setup = async () => {
  const posts = await require('./posts')
  let post
  let modDate
  for (let i = 0; i < posts.length; i += 1) {
    post = posts[i]
    modDate = new Date(post.last_publication_date)
    modDate = getLastModifiedDate(modDate)
    sitemap.add({
      url: `/blog/${post.uid}`,
      lastmodISO: modDate,
      changefreq: 'daily',
      priority: 0.9
    })
  }

  require('./pages')(sitemap)

  return sitemap
}

module.exports = setup
