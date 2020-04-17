const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins');
const withCss = require("@zeit/next-css")
require('dotenv').config()

const nextConfig = {
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style\/css.*?/;
        const origExternals = [...config.externals];
        config.externals = [ // eslint-disable-line
          (context, request, callback) => { // eslint-disable-line
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        });
      }
      return config;
    },
  };

  /*module.exports = withPlugins(
    [
      [withCss],
      [
        withSass,
        {
          cssModules: true,
          cssLoaderOptions: {
            localIdentName: '[path]___[local]___[hash:base64:5]',
          },
        },
      ],
    ],
    nextConfig,
  );*/

  module.exports = {
    env: {
        // Reference a variable that was defined in the .env file and make it available at Build Time
        SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    },
  }
const withCSS = require('@zeit/next-css')
module.exports = withCSS({})
