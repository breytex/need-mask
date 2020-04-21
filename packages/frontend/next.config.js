const Dotenv = require("dotenv-webpack");

module.exports = {
  env: {
    HASURA_URL: process.env.HASURA_URL,
    HASURA_CDN_URL: process.env.HASURA_CDN_URL,
    ALGOLIA_PLACES_APPID: process.env.ALGOLIA_PLACES_APPID,
    ALGOLIA_PLACES_KEY: process.env.ALGOLIA_PLACES_KEY,
    SLACK_REQUEST_HOOK_URL:
      "https://hooks.slack.com/services/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",
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
