const Dotenv = require("dotenv-webpack");

module.exports = {
  env: {
    HASURA_URL: process.env.HASURA_URL,
    HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
    SPACES_KEY: process.env.SPACES_KEY,
    SPACES_SECRET: process.env.SPACES_SECRET,
    ALGOLIA_PLACES_APPID: process.env.ALGOLIA_PLACES_APPID,
    ALGOLIA_PLACES_KEY: process.env.ALGOLIA_PLACES_KEY,
    WEBHOOK_AUTH_SECRET: process.env.WEBHOOK_AUTH_SECRET,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_IS_SECURED: process.env.SMTP_IS_SECURED,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
  },
  webpack: (config) => {
    // Add the new plugin to the existing webpack plugins
    config.plugins.push(new Dotenv({
      silent: true
    }));

    return config;
  },
  modules: true,
};
