const Dotenv = require("dotenv-webpack");

module.exports = {
  env: {
    HASURA_URL: process.env.HASURA_URL,
    HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
    SPACES_KEY: process.env.SPACES_KEY,
    SPACES_SECRET: process.env.SPACES_SECRET,
    ALGOLIA_PLACES_APPID: process.env.ALGOLIA_PLACES_APPID,
    ALGOLIA_PLACES_KEY: process.env.ALGOLIA_PLACES_KEY,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add the new plugin to the existing webpack plugins
    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
  modules: true,
};
