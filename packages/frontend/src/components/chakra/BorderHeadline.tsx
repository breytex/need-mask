import React, { ReactElement } from "react";
import { Box, Text } from "@chakra-ui/core";

interface Props {
  children: string;
}

export function BorderHeadline({ children }: Props): ReactElement {
  return (
    <Box borderBottom="1px solid" borderColor="blue.700" mb="6">
      <Text fontSize="20px" color="blue.700" fontWeight="bold">
        {children.toUpperCase()}
      </Text>
    </Box>
  );
}
