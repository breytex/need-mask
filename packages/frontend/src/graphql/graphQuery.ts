import fetch from "isomorphic-unfetch";

export interface GraphQueryProps {
  headers?: object;
  auth?: boolean;
  shouldCache?: boolean;
}
interface HasuraError {
  extensions: {
    code: string;
    path: string;
  };
  message: string;
}

export interface HasuraResponse<T> {
  errors: Array<HasuraError> | [];
  data?: T;
}

export async function graphQuery<T>(
  query: string,
  variables?: object,
  props?: GraphQueryProps
): Promise<T> {
  const { headers = {}, auth = false, shouldCache = false } = props || {};
  
  const getAuthorization = () => {
    if (!auth || window === undefined) return {};
    const token = localStorage.getItem("accessToken");
    if (!token) return {};
    const claims = JSON.parse(atob(token.split(".")[1]));
    const { expiresIn, iat: issuedAt } = claims;
    const unixtime = Math.round(new Date().getTime() / 1000);

    if (expiresIn + issuedAt < unixtime) {
      localStorage.removeItem("accessToken");
      return {};
    }
    const parsedToken = JSON.parse(token);

    return { Authorization: `Bearer ${parsedToken}` };
  };
  // const fetchEndpoint = shouldCache
  //   ? process.env.HASURA_CDN_URL
  //   : process.env.HASURA_URL;
  
  // Disable cache because Firat pays for it all the time lol
  const fetchEndpoint = process.env.HASURA_URL;
  try {
    const res = await fetch(fetchEndpoint, {
      method: "POST",
      body: JSON.stringify({
        query,
        variables,
      }),
      headers: {
        "Content-Type": "application/json",
        ...headers,
        ...getAuthorization(),
      },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }
    return await res.json();
  } catch (e) {
    throw new Error(e.message);
  }
}
