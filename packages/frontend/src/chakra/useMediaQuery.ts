import React, { useState, useEffect } from "react";
import { customTheme } from "./theme";

// Credits: https://github.com/chakra-ui/chakra-ui/issues/409
export const useMediaQuery = (values) => {
  const getIndex = () => {
    if (typeof window === "undefined") return 0;
    const [_, ...breakpoints] = customTheme.breakpoints;
    const idx = breakpoints.filter(
      (b) => window.matchMedia(`screen and (min-width: ${b})`).matches
    ).length;
    return idx;
  };

  const [index, setIndex] = useState(getIndex());

  useEffect(() => {
    const onResize = () => setIndex(getIndex());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // SSR - early bailout
  if (typeof window === "undefined") return [values[0], 0];

  const payload = values[index >= values.length ? values.length - 1 : index];

  return payload;
};
