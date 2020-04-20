const Dotenv = require("dotenv-webpack");

module.exports = {
  env: {
    HASURA_URL: process.env.HASURA_URL,
    ALGOLIA_PLACES_APPID: process.env.ALGOLIA_PLACES_APPID,
    ALGOLIA_PLACES_KEY: process.env.ALGOLIA_PLACES_KEY,
  },
  webpack: (config) => {
    // Add the new plugin to the existing webpack plugins
    config.plugins.push(
      new Dotenv({
        silent: true,
      })
    );

    return config;
  },
  modules: true,
};
