/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withLess = require('@zeit/next-less');

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

const nextConfig = {
  serverRuntimeConfig: {
    apiUrl: process.env.API_URL,
  },
  publicRuntimeConfig: {
    host: process.env.HOST,
    googleAnalyticsCode: process.env.GOOGLE_ANALYTICS_TRACKING_CODE,
  },
  webpack: (config, options) => {
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./config/initializers/polyfills.js')
      ) {
        entries['main.js'].unshift('./config/initializers/polyfills.js');
      }

      return entries;
    };

    return config;
  },
};

module.exports = withPlugins(
  [
    [
      withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
        },
      },
    ],
  ],
  nextConfig,
);
