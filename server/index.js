const express = require('express');
const next = require('next');
const path = require('path');
const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;
const root = dev
  ? `http://localhost:${port}`
  : 'https://valentingurkov.herokuapp.coh';
const app = next({ dev });
const handle = app.getRequestHandler();
const sitemapAndRobots = require('./sitemapAndRobots');

if (dev) {
  require('dotenv').load();
}

app
  .prepare()
  .then(async () => {
    const server = express();

    /* server.get('/b', (req, res) => {
    return app.render(req, res, '/a', req.query)
  })

  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/posts', { id: req.params.id })
  }) */

    await sitemapAndRobots({ server });

    const faviconOptions = {
      root: path.join(__dirname, '../static')
    };
    server.get('/favicon.ico', (req, res) =>
      res.status(200).sendFile('favicon.ico', faviconOptions)
    );

    server.get('/privacy-policy', (req, res) => {
      return app.render(req, res, '/privacy', req.query);
    });

    server.get('/blog/:slug', (req, res) => {
      const nextJsPage = '/blogPost';
      const queryParams = { slug: req.params.slug };
      app.render(req, res, nextJsPage, queryParams);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on ${root}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
