const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {}
    : require('next-server/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    // Config used to run in production.
    return {};
  }

  const withSass = require('@zeit/next-sass');

  return withSass({
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
};
