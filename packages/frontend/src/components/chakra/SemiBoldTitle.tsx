import * as React from "react";
import { Heading } from "@chakra-ui/core";

type Props = {};

export const SemiBoldTitle: React.FC<Props> = ({ children }) => {
  return (
    <Heading fontWeight="normal" size="lg" mb={12} textAlign="center">
      {children}
    </Heading>
  );
};

export default SemiBoldTitle;
