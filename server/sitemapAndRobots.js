const sm = require('sitemap')
const path = require('path')

// If you use Dotenv you can include your .env variables uncommenting the following line
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const sitemap = sm.createSitemap({
  hostname: process.env.SITE_ROOT || 'https://valentingurkov.herokuapp.com',
  cacheTime: 600000 // 600 sec - cache purge period
})

const setup = async ({ server }) => {
  const posts = await require('./posts')
  let post
  let modDate
  for (let i = 0; i < posts.length; i += 1) {
    post = posts[i]
    modDate = new Date(post.last_publication_date)
    modDate = `${modDate.getFullYear()}-${`0${modDate.getMonth() + 1}`.slice(-2)}-${`0${modDate.getDate()}`.slice(-2)}`
    sitemap.add({
      url: `/blog/${post.uid}`,
      lastmodISO: modDate,
      changefreq: 'daily',
      priority: 0.9
    })
  }

  require('./pages')(sitemap)

  server.get('/sitemap.xml', (req, res) => {
    sitemap.toXML((err, xml) => {
      if (err) {
        res.status(500).end()
        return
      }

      res.header('Content-Type', 'application/xml;charset=UTF-8')
      res.status(200).send(xml)
    })
  })

  const robotsOptions = {
    root: path.join(__dirname, '../static'),
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  }

  server.get('/robots.txt', (req, res) => res.status(200).sendFile('robots.txt', robotsOptions))
}

module.exports = setup
