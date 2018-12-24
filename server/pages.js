const path = require('path');
const glob = require('glob');
const fs = require('fs');

const SOURCE =
  process.env.SOURCE || path.join(__dirname, '..', 'pages', '/**/!(_*).js');
const SITE_ROOT =
  process.env.SITE_ROOT || 'https://valentingurkov.herokuapp.com';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = sitemap => {
  let diskPages = glob.sync(SOURCE);

  diskPages.forEach(page => {
    let stats = fs.statSync(page);
    let modDate = new Date(stats.mtime);
    let lastMod = `${modDate.getFullYear()}-${(
      '0' +
      (modDate.getMonth() + 1)
    ).slice(-2)}-${('0' + modDate.getDate()).slice(-2)}`;

    page = page.replace(resolveApp('pages'), '');
    page = page.replace(/.js$/, '');
    page = `${SITE_ROOT}${page}`;

    if (page.match(/.*\/index$/)) {
      page = page.replace(/(.*)index$/, '$1');
    }

    sitemap.add({
      url: page,
      lastmodISO: lastMod,
      changefreq: 'always',
      priority: 0.5
    });
  });
};
