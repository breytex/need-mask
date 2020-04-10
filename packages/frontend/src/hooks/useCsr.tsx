import React, { useState, useEffect } from "react";

// Returns `true` if layout is client side rendered
export const useCsr = () => {
  const [isCsr, setIsCsr] = useState(false);
  useEffect(() => setIsCsr(true), []);

  return isCsr;
};
