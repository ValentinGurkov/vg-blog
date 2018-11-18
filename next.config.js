const withSass = require('@zeit/next-sass');
module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    url: false,
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]'
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };
    return config;
  }
});
