/* eslint-disable import/no-extraneous-dependencies */
const withOffline = require('next-offline');
const withOptimizedImages = require('next-optimized-images');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const StyledJSXWebpackLoader = require('styled-jsx/webpack').loader;
const { resolve } = require('path');

const dev = process.env.NODE_ENV !== 'production';

const workboxOpts = {
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: 'public/service-worker.js',
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: new RegExp('https://uniblog.cdn.prismic.io/api/v2'),
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'api-cache',
          cacheableResponse: {
            statuses: [200]
          }
        }
      },
      {
        urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif|webp)/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200
          }
        }
      }
    ]
  }
};

const optimizedImages = {
  optimizeImagesInDev: true
};

const analyzeBundles = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  }
};

const manifestConfig = {
  filename: 'static/manifest.json',
  name: "Valentin Gurkov's Blog",
  short_name: 'VG Blog',
  description: 'Making good health and lifestyle choices has never been easier.',
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
      src: resolve('public/logo.png'),
      sizes: [72, 96, 128, 144, 152, 192, 256, 384, 512],
      destination: '/static'
    },
    {
      src: resolve('public/icons/apple-touch-icon.png'),
      sizes: [57, 60, 72, 76, 120, 144, 152, 180],
      destination: '/static',
      ios: true
    }
  ],
  includeDirectory: true,
  publicPath: '..'
};

const granularChunks = {
  experimental: {
    granularChunks: true
  }
};

module.exports = withBundleAnalyzer(
  withOptimizedImages(
    withOffline({
      ...workboxOpts,
      ...optimizedImages,
      ...analyzeBundles,
      ...granularChunks,
      webpack: (config, { isServer, defaultLoaders }) => {
        config.module.rules.push({
          test: /\.scss$/,
          use: [
            defaultLoaders.babel,
            {
              loader: StyledJSXWebpackLoader,
              options: {
                type: "global"
              }
            },
            'sass-loader'
          ]
        });

        if (!dev && !isServer) {
          config.plugins.push(new WebpackPwaManifest(manifestConfig));
        }
        // Fixes npm packages that depend on `fs` module
        config.node = {
          fs: 'empty'
        };
        return config;
      }
    })
  )
);
/* eslint-enable import/no-extraneous-dependencies */
