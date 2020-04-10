const Dotenv = require("dotenv-webpack");

module.exports = () => {
  const { HASURA_URL, HASURA_ADMIN_SECRET } = process.env;

  if (!HASURA_URL) {
    throw new Error("HASURA_URL not found");
  }

  if (!HASURA_ADMIN_SECRET) {
    throw new Error("HASURA_ADMIN_SECRET not found");
  }

  console.log(HASURA_URL, HASURA_ADMIN_SECRET);

  return {
    env: {
      HASURA_URL,
      HASURA_ADMIN_SECRET,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Add the new plugin to the existing webpack plugins
      config.plugins.push(new Dotenv({ silent: true }));

      return config;
    },
    modules: true,
  };
};
