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
  const { additionalHeaders, ...rest } = props;

  const queryProps = {
    ...rest,
    additionalHeaders: { ...additionalHeaders, ...adminHeader },
  };

  return graphQuery<T>(query, variables, queryProps);
};
