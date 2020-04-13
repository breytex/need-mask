import { GraphQueryProps, graphQuery } from "./../../../graphql/graphQuery";

const adminHeader = {
  "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
};

// Wrapps graphQuery and adds hasura admin secret.
// Backend-use only!
export const rootGraphQuery = <T>(
  query: string,
  variables?: object,
  props?: GraphQueryProps
) => {
  const { headers = {}, ...rest } = props || {};

  const queryProps = {
    ...rest,
    headers: { ...headers, ...adminHeader },
  };

  return graphQuery<T>(query, variables, queryProps);
};
