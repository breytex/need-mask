import React, { ReactElement } from "react";
import { SimpleGrid } from "@chakra-ui/core";
interface Props {
  children: ReactElement[];
  mt?: string;
}

export function FieldRow({ children, mt }: Props): ReactElement {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={mt}>
      {children}
    </SimpleGrid>
  );
}
