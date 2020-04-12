import fetch from 'node-fetch'

async function graphQuery(query, variables?) {
  try {
    const res = await fetch(
      process.env.HASURA_URL, {
      method: "POST",
      body: JSON.stringify({
        query,
        variables
      }),
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
      }
    }
    );
    return await res.json();
  } catch (e) {
    throw new Error(e.message);
  }
}

export default async (req, res) => {
  const hasuraProductTypes = await graphQuery(`
    query {
      productTypes {
        id
        title
      }
    }
  `)
  const {
    productTypes
  } = hasuraProductTypes.data
  res.send(productTypes)
}

export { graphQuery }
