import { useState, useEffect } from "react";
import { graphQuery, GraphQueryProps } from "../graphql/graphQuery";

export const useMutation = <T,>(query: string, props: GraphQueryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<object>(null);
  const [data, setData] = useState<T>(null);

  const trigger = async (variables): Promise<T> => {
    setIsLoading(true);
    let data;
    try {
      data = await graphQuery<T>(query, variables, { ...props });
      setData(data);
    } catch (e) {
      setError(e);
    }
    setIsLoading(false);
    return data;
  };

  return [trigger, data, isLoading, error];
};
