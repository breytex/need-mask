const fetch = require("isomorphic-unfetch");

export const urqlConfig = {
  url: process.env.HASURA_URL,
  fetch,
  fetchOptions: {
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
  },
};

export type PageWithData<T> = {
  data: T;
};
