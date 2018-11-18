if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    /* server.get('/b', (req, res) => {
    return app.render(req, res, '/a', req.query)
  })

  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/posts', { id: req.params.id })
  }) */

    const robotsOptions = {
      root: __dirname + '/static/',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
      }
    }
    server.get('/robots.txt', (req, res) =>
      res.status(200).sendFile('robots.txt', robotsOptions)
    )

    const sitemapOptions = {
      root: __dirname + '/static/',
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8'
      }
    }
    server.get('/sitemap.xml', (req, res) =>
      res.status(200).sendFile('sitemap.xml', sitemapOptions)
    )

    const faviconOptions = {
      root: __dirname + '/static/'
    }
    server.get('/favicon.ico', (req, res) =>
      res.status(200).sendFile('favicon.ico', faviconOptions)
    )

    server.get('/blog/:slug', (req, res) => {
      const nextJsPage = '/blogPost'
      const queryParams = { slug: req.params.slug }
      app.render(req, res, nextJsPage, queryParams)
    })

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
