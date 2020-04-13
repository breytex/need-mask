import fetch from "node-fetch";

export interface GraphQueryProps {
  headers?: object;
  auth?: boolean;
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
  const { headers = {}, auth = false } = props || {};

  const getAuthorization = () => {
    if (!auth || window === undefined) return {};
    const token = localStorage.getItem("accessToken");
    if (!token) return {};
    const claims = JSON.parse(atob(token.split(".")[1]));
    const { expiresIn, iat: issuedAt } = claims;
    if (expiresIn + issuedAt < Date.now()) {
      localStorage.removeItem("accessToken");
      return {};
    }
    return { Authorization: `Bearer ${token}` };
  };

  try {
    const res = await fetch(process.env.HASURA_URL, {
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
      const text = res.text();
      throw new Error(text);
    }
    return await res.json();
  } catch (e) {
    throw new Error(e.message);
  }
}
