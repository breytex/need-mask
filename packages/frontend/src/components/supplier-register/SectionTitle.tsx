import React from "react";
import { Text } from "@chakra-ui/core";
interface Props {
  children: string;
}

const SectionTitle = ({ children }: Props) => {
  return (
    <Text fontSize="25px" mt="10" mb="6">
      {children}
    </Text>
  );
};

export default SectionTitle;
