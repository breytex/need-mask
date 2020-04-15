import React, { ReactNode } from "react";
import { Text } from "@chakra-ui/core";

interface Props {
  children: ReactNode;
  mb?: string;
}

const PageTitle = ({ children, mb = "8" }: Props) => {
  return (
    <Text fontSize="36px" mb={mb}>
      {children}
    </Text>
  );
};

export default PageTitle;
