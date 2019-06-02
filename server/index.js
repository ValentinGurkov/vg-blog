const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  require('dotenv').config()
}
const express = require('express')
const next = require('next')
const { join } = require('path')
const CacheableResponse = require('cacheable-response')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const generateSitemap = require('./generateSitemap')

const port = process.env.PORT || 3000
const root = dev ? `http://localhost:${port}` : `https://www.valentingurkov.com:${port}`
const app = next({ dev })

const ssrCache = CacheableResponse({
  ttl: dev ? 0 : 1000 * 60 * 60, // 1hour
  get: async ({ req, res, pagePath, queryParams }) => ({
    data: await app.renderToHTML(req, res, pagePath, queryParams)
  }),
  send: ({ data, res }) => res.send(data)
})

const whitelist = [
  `http://localhost:${port}`,
  'https://www.valentingurkov.com',
  'https://valentingurkov.com',
  'https://cdn.valentingurkov.com',
  'https:valentingurkov.herokuapp.com'
]
const corsOptions = {
  origin(origin, callback) {
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error(`Not allowed by CORS - origin:${origin}`))
    }
  }
}

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(cors(corsOptions))
    server.use(compression())
    server.use(helmet())

    server.options('*', cors())

    server.get('/privacy-policy', (req, res) => app.render(req, res, '/privacy'))

    server.get('/terms-and-conditions', (req, res) => app.render(req, res, '/terms'))

    server.get('/our-mission', (req, res) => app.render(req, res, '/ourMission'))

    server.get('/articles', (req, res) => app.render(req, res, '/articles'))

    server.get('/articles/:slug', (req, res) => {
      const nextJsPage = '/blogPost'
      const queryParams = { slug: req.params.slug }
      ssrCache({ req, res, pagePath: nextJsPage, queryParams })
    })

    server.get('/sitemap.xml', async (req, res) => {
      const sitemap = await generateSitemap()
      sitemap.toXML((err, xml) => {
        if (err) {
          res.status(500).end()
          return
        }

        res.header('Content-Type', 'application/xml;charset=UTF-8')
        res.status(200).send(xml)
      })
    })

    const iconFileOptions = {
      root: join(__dirname, '../static/icons')
    }

    server.get('/browserconfig.xml', (req, res) => res.status(200).sendFile('browserconfig.xml', iconFileOptions))

    server.get('/apple-touch-icon.png', (req, res) => res.status(200).sendFile('apple-touch-icon.png', iconFileOptions))

    const rootFileOptions = {
      root: join(__dirname, '../static')
    }

    server.get('/favicon.ico', (req, res) => res.status(200).sendFile('favicon.ico', rootFileOptions))

    const robotsOptions = {
      ...rootFileOptions,
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
      }
    }

    server.get('/robots.txt', (req, res) => res.status(200).sendFile('robots.txt', robotsOptions))

    server.use(
      '/static',
      express.static(join(__dirname, '../static'), {
        maxAge: '365d',
        immutable: true
      })
    )
    server.get('*', (req, res) => {
      if (req.url.includes('/service-worker.js')) {
        // Don't cache service worker is a best practice (otherwise clients wont get emergency bug fix)
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
        res.set('Content-Type', 'application/javascript')
        const filePath = join(__dirname, '../.next/static', 'service-worker.js')
        app.serveStatic(req, res, filePath)
      } else {
        ssrCache({ req, res, pagePath: req.url })
      }
    })

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on ${root}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    throw ex
  })
