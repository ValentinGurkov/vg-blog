const express = require('express')
const next = require('next')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000
const root = dev ? `http://localhost:${port}` : 'https://valentingurkov.herokuapp.com'
const app = next({ dev })
const handle = app.getRequestHandler()
const generateSitemap = require('./sitemap')

if (dev) {
  require('dotenv').load()
}

require('pretty-error').start()

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
      root: path.join(__dirname, '../static')
    }
    server.get('/favicon.ico', (req, res) => res.status(200).sendFile('favicon.ico', faviconOptions))

    const robotsOptions = {
      root: path.join(__dirname, '../static'),
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
      }
    }

    server.get('/robots.txt', (req, res) => res.status(200).sendFile('robots.txt', robotsOptions))

    server.get('/privacy-policy', (req, res) => app.render(req, res, '/privacy', req.query))

    server.get('/blog/:slug', (req, res) => {
      const nextJsPage = '/blogPost'
      const queryParams = { slug: req.params.slug }
      app.render(req, res, nextJsPage, queryParams)
    })

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on ${root}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    throw new Error()
  })
