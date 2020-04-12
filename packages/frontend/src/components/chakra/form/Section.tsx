import React from "react";
import { Text, Box } from "@chakra-ui/core";
interface Props {
  children: string;
  title: string;
}

export const Section = ({ children, title }) => (
  <React.Fragment>
    <Box borderBottom="1px solid" borderColor="blue.700" mt="10" mb="6">
      <Text fontSize="25px" color="blue.700" fontWeight="bold">
        {title}
      </Text>
    </Box>
    <Box px={{ base: "0", md: "30px" }}>{children}</Box>
  </React.Fragment>
);
