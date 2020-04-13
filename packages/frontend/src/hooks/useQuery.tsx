import { useState, useEffect } from "react";
import { graphQuery, GraphQueryProps } from "../graphql/graphQuery";

export const useQuery = <T,>(query: string, props: GraphQueryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<object>(null);
  const [data, setData] = useState<T>(null);

  const trigger = async () => {
    setIsLoading(true);
    try {
      const data = await graphQuery<T>(query, undefined, { ...props });
      setData(data);
    } catch (e) {
      setError(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    trigger();
  }, []);

  return [data, isLoading, error];
};
