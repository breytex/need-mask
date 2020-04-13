import { useState } from "react";
import {
  graphQuery,
  GraphQueryProps,
  HasuraResponse,
} from "../graphql/graphQuery";

export const useMutation = <T,>(query: string, props?: GraphQueryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([] as Array<Error>);
  const [data, setData] = useState(null as T);

  const trigger = (variables: { [key: string]: any }) => {
    setIsLoading(true);
    return graphQuery<HasuraResponse<T>>(query, variables, { ...props })
      .then(({ data, errors = [] }) => {
        setData(data);
        setErrors(
          errors.map((error) => ({
            name: error.extensions.code,
            message: error.message,
          }))
        );
        setIsLoading(false);
        return { data, errors };
      })
      .catch((error) => setErrors([error]));
  };

  return { trigger, data, isLoading, errors };
};
