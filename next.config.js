const withSass = require('@zeit/next-sass');
const withOffline = require('next-offline');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { resolve } = require('path');

module.exports = withOffline(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      url: false,
      importLoaders: 1,
      localIdentName: 'purify_[local]___[hash:base64:5]'
    },
    workboxOpts: {
      swDest: 'static/service-worker.js',
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: ['.next/static/*', '.next/static/commons/*'],
      modifyUrlPrefix: {
        '.next': '/_next'
      },
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache'
          }
        },
        {
          urlPattern: /\/blog\//,
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache'
          }
        },
        {
          urlPattern: new RegExp('https://uniblog.cdn.prismic.io/api/v2'),
          handler: 'staleWhileRevalidate',
          options: {
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [200]
            }
          }
        },
        {
          urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'image-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
    webpack: (config, { isServer, dev }) => {
      if (!isServer) {
        /* config.module.rules
          .find(({ test }) => test.test('.scss'))
          .use.push({
            loader: 'css-purify-webpack-loader',
            options: {
              includes: ['./pages/*.js', './components/*.js']
            }
          }); */
        if (!dev) {
          config.plugins.push(
            new WebpackPwaManifest({
              filename: 'static/manifest.json',
              name: "Valentin Gurkov's Blog",
              short_name: 'VG Blog',
              description: 'Making good health and lifestyle choices has never been easier!',
              background_color: '#414042',
              theme_color: '#ff6c0c',
              display: 'standalone',
              orientation: 'portrait',
              fingerprints: false,
              inject: false,
              start_url: '/',
              ios: {
                'apple-mobile-web-app-title': 'VG Blog',
                'apple-mobile-web-app-status-bar-style': '#ff6c0'
              },
              icons: [
                {
                  src: resolve('static/favicon.ico'),
                  sizes: [96, 128, 192, 256, 384, 512],
                  destination: '/static'
                }
              ],
              includeDirectory: true,
              publicPath: '..'
            })
          );
        }
      }
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      };
      return config;
    }
  })
);
