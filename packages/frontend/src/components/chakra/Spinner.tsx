import React from "react";
import { Spinner as ChakraSpinner, Flex } from "@chakra-ui/core";

interface Props {}

export const Spinner = (props: Props) => {
  return (
    <Flex justify="center" height="100%" alignItems="center">
      <ChakraSpinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};
