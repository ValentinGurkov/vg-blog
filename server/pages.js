const path = require('path')
const glob = require('glob')
const fs = require('fs')
const { getLastModifiedDate } = require('./util')

const SOURCE = process.env.SOURCE || path.join(__dirname, '..', 'pages', '/**/!(_*).js')
const SITE_ROOT = process.env.SITE_ROOT || 'https://www.valentingurkov.com'
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const diskPages = glob.sync(SOURCE)

const transformUlr = page => {
  let priority = 0.5

  const stats = fs.statSync(page)
  const modDate = new Date(stats.mtime)
  const lastMod = getLastModifiedDate(modDate)

  page = page.replace(resolveApp('pages'), '')
  page = page.replace(/.js$/, '')
  page = `${SITE_ROOT}${page}`

  if (page.match(/.*\/privacy$/)) {
    page = page.replace(/(.*)privacy$/, '$1privacy-policy')
  }

  if (page.match(/.*\/ourMission$/)) {
    page = page.replace(/(.*)ourMission$/, '$1our-mission')
  }

  if (page.match(/.*\/index$/)) {
    page = page.replace(/(.*)index$/, '$1')
    priority = 1
  }

  return { page, priority, lastMod }
}

module.exports = sitemap => {
  diskPages.forEach(diskPage => {
    if (diskPage.match(/.*\/blogPost.js$/)) {
      return
    }

    const { page, priority, lastMod } = transformUlr(diskPage)

    sitemap.add({
      url: page,
      lastmodISO: lastMod,
      changefreq: 'always',
      priority
    })
  })
}
