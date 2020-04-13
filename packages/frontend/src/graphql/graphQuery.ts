import fetch from "node-fetch";
import { checkTokenValid } from "../helpers/jwt";

export interface GraphQueryProps {
  additionalHeaders?: object;
  auth?: boolean;
}

export async function graphQuery<T>(
  query: string,
  variables?: object,
  props?: GraphQueryProps
): Promise<T> {
  const { additionalHeaders, auth = false } = props;

  let headers = { "Content-Type": "application/json", ...additionalHeaders };

  if (auth && typeof window !== "undefined") {
    let authHeaders = {};
    const storedTokenJson = window.localStorage.getItem("accessToken");
    if (storedTokenJson) {
      try {
        const storedToken = JSON.parse(storedTokenJson);
        if (checkTokenValid(storedToken)) {
          authHeaders = {
            Authorization: `Bearer ${storedToken.jwt}`,
          };
        }
      } catch (e) {
        console.error(e);
      }
    }
    headers = { ...headers, ...authHeaders };
  }

  try {
    const res = await fetch(process.env.HASURA_URL, {
      method: "POST",
      body: JSON.stringify({
        query,
        variables,
      }),
      headers,
    });
    return await res.json();
  } catch (e) {
    throw new Error(e.message);
  }
}

// export default async (req, res) => {
//   const hasuraProductTypes = await graphQuery(`
//     query {
//       productTypes {
//         id
//         title
//       }
//     }
//   `)
//   const {
//     productTypes
//   } = hasuraProductTypes.data
//   res.send(productTypes)
// }

// export { graphQuery }

// "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
