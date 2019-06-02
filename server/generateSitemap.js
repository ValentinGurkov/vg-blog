const sm = require('sitemap')
const { getLastModifiedDate } = require('./util')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const sitemap = sm.createSitemap({
  hostname: process.env.SITE_ROOT || 'https://www.valentingurkov.com',
  cacheTime: 600000 // 600 sec - cache purge period
})

const setup = async () => {
  const posts = await require('./posts')
  let post
  let modDate
  const images = []
  let image
  for (let i = 0; i < posts.length; i += 1) {
    post = posts[i]
    image = post.data.blog_post.images.value.main
    images.push({
      url: image.url,
      caption: image.alt,
      title: image.alt
    })
    modDate = new Date(post.last_publication_date)
    modDate = getLastModifiedDate(modDate)
    sitemap.add({
      url: `/articles/${post.uid}`,
      img: [
        {
          url: image.url,
          caption: image.alt,
          title: image.alt
        }
      ],
      lastmodISO: modDate,
      changefreq: 'daily',
      priority: 0.9
    })
  }

  require('./pages')(sitemap, images)

  return sitemap
}

module.exports = setup
