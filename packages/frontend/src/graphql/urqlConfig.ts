import { checkTokenValid } from "../helpers/jwt";

const fetch = require("isomorphic-unfetch");

let headers = {};
if (typeof window !== "undefined") {
  const storedTokenJson = window.localStorage.getItem("accessToken");
  if (storedTokenJson) {
    try {
      const storedToken = JSON.parse(storedTokenJson);
      if (checkTokenValid(storedToken)) {
        headers = {
          Authorization: `Bearer ${JSON.stringify(storedToken.jwt)}`,
        };
      }
    } catch (e) {}
  }
}

export const urqlConfig = {
  url: process.env.HASURA_URL,
  fetch,
  fetchOptions: {
    headers: {
      ...headers,
    },
  },
};

export type PageWithData<T> = {
  data: T;
};
