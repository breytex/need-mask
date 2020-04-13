import { useState, useEffect } from "react";
import {
  graphQuery,
  GraphQueryProps,
  HasuraResponse,
} from "../graphql/graphQuery";

export const useQuery = <T,>(query: string, props?: GraphQueryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState(null as T);

  const trigger = () => {
    setIsLoading(true);
    graphQuery<HasuraResponse<T>>(query, undefined, { ...props })
      .then(({ data, errors = [] }) => {
        setData(data);
        setErrors(
          errors.map((error) => ({
            name: error.extensions.code,
            message: error.message,
          }))
        );
        setIsLoading(false);
      })
      .catch((error) => setErrors([error]));
  };

  useEffect(() => {
    trigger();
  }, []);

  return [data, isLoading, errors];
};
