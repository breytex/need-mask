import React, { ReactElement } from "react";
import { Box, Text } from "@chakra-ui/core";

interface Props {
  children: string;
}

export default function Headline({ children }: Props): ReactElement {
  return (
    <Box borderBottom="1px solid" borderColor="blue.700" mt="10" mb="6">
      <Text fontSize="25px" color="blue.700" fontWeight="bold">
        {children}
      </Text>
    </Box>
  );
}
