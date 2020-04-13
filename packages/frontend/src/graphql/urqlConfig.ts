import { checkTokenValid } from "../helpers/jwt";

const fetch = require("isomorphic-unfetch");

let Authorization;
if (typeof window !== "undefined") {
  const storedTokenJson = window.localStorage.getItem("accessToken");
  if (storedTokenJson) {
    try {
      const storedToken = JSON.parse(storedTokenJson);
      if (checkTokenValid(storedToken)) {
        Authorization = `Bearer ${JSON.stringify(storedToken.jwt)}`;
      }
    } catch (e) {}
  }
}

export const urqlConfig = {
  url: process.env.HASURA_URL,
  fetch,
  fetchOptions: {
    headers: {
      Authorization,
    },
  },
};

export type PageWithData<T> = {
  data: T;
};
