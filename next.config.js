/* eslint-disable import/no-extraneous-dependencies */
const withOffline = require('next-offline');
const withOptimizedImages = require('next-optimized-images');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const StyledJSXWebpackLoader = require('styled-jsx/webpack').loader;
const { resolve } = require('path');

const dev = process.env.NODE_ENV !== 'production';

module.exports = withOptimizedImages(
  withOffline({
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
        },
        {
          urlPattern: /^https?.*/,
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache'
          }
        }
      ]
    },
    webpack: (config, { isServer, defaultLoaders }) => {
      config.module.rules.push({
        test: /\.scss$/,
        use: [
          defaultLoaders.babel,
          {
            loader: StyledJSXWebpackLoader,
            options: {
              type: 'scoped'
            }
          },
          'sass-loader'
        ]
      });

      if (!dev && !isServer) {
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
            lang: 'en',
            dir: 'ltr',
            ios: {
              'apple-mobile-web-app-title': 'VG Blog',
              'apple-mobile-web-app-status-bar-style': '#ff6c0'
            },
            icons: [
              {
                src: resolve('static/logo.jpg'),
                sizes: [72, 96, 128, 144, 152, 192, 256, 384, 512],
                destination: '/static'
              },
              {
                src: resolve('static/icons/apple-touch-icon.png"'),
                sizes: [180],
                destination: '/static'
              },
              {
                src: resolve('static/icons/apple-touch-icon-120x120.png"'),
                sizes: [120],
                destination: '/static'
              }
            ],
            includeDirectory: true,
            publicPath: '..'
          })
        );
      }
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      };
      return config;
    }
  })
);
/* eslint-enable import/no-extraneous-dependencies */
