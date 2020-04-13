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
          Authorization: `Bearer ${storedToken.jwt}`,
        };
      }
    } catch (e) {}
  }
}

export const urqlConfig = (addAuthHeaders = false) => ({
  url: process.env.HASURA_URL,
  fetch,
  fetchOptions: {
    headers: addAuthHeaders ? headers : {},
  },
});

export type PageWithData<T> = {
  data: T;
};
