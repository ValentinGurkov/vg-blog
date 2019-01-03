const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  require('dotenv').load()
}
const express = require('express')
const next = require('next')
const { join } = require('path')
const LRUCache = require('lru-cache')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const generateSitemap = require('./generateSitemap')

const devSslPort = parseInt(process.env.SSL_PORT, 10) || 3443
const port = process.env.PORT || 3000

const root = dev ? `http://localhost:${port}` : `https://valentingurkov.com:${port}`
const app = next({ dev })
const handle = app.getRequestHandler()

const ssrCache = new LRUCache({
  length(n, key) {
    return n.toString().length + key.toString().length
  },
  max: 100 * 1000 * 1000, // 100MB cache soft limit
  maxAge: 1000 * 60 * 60 // 1hour
})

const whitelist = [
  `http://localhost:${port}`,
  `https://www.valentingurkov.com:${devSslPort}`,
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

    /* app.use((req, res, next) => {
      res.setHeader('Cache-Control', 'public,max-age=31536000,immutable')
      next()
    }) */

    server.get('/static', (req, res) => console.log('static'))

    server.get('/', (req, res) => renderAndCache(req, res, '/'))

    server.get('/privacy-policy', (req, res) => renderAndCache(req, res, '/privacy', req.query))

    server.get('/blog/:slug', (req, res) => {
      const nextJsPage = '/blogPost'
      const queryParams = { slug: req.params.slug }
      renderAndCache(req, res, nextJsPage, queryParams)
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

    const faviconOptions = {
      root: join(__dirname, '../static')
    }
    server.get('/favicon.ico', (req, res) => res.status(200).sendFile('favicon.ico', faviconOptions))

    const robotsOptions = {
      root: join(__dirname, '../static'),
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
      }
    }

    server.get('/robots.txt', (req, res) => res.status(200).sendFile('robots.txt', robotsOptions))

    server.get('*', (req, res) => {
      if (req.url.includes('/service-worker.js')) {
        const filePath = join(__dirname, '../.next/static', 'service-worker.js')
        app.serveStatic(req, res, filePath)
      } else {
        handle(req, res, req.url)
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

async function renderAndCache(req, res, pagePath, queryParams) {
  const key = req.url

  // if page is in cache, server from cache
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  try {
    // if not in cache, render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams)

    // if something wrong with the request or we're in development mode, let's skip the cache
    if (dev || res.statusCode !== 200) {
      res.send(html)
      return
    }

    ssrCache.set(key, html)

    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams)
  }
}
