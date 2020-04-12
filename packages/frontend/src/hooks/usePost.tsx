import { useEffect, useState } from "react";

export const usePost = (endpoint) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const trigger = async (payload) => {
    setIsLoading(true);
    try {
      const result = await fetch(endpoint, {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(payload),
      });
      setData(result);
    } catch (e) {
      setError(e);
    }
    setIsLoading(false);
  };

  return { trigger, isLoading, data, error, setError };
};
