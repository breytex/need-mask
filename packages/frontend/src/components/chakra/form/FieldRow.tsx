import React, { ReactElement } from "react";
import { Flex } from "@chakra-ui/core";
interface Props {
  children: ReactElement[];
  mt?: string;
}

export function FieldRow({ children, mt }: Props): ReactElement {
  return (
    <Flex
      justify="stretch"
      flexDirection={{ base: "column", md: "row" }}
      mt={mt}
    >
      {children}
    </Flex>
  );
}
