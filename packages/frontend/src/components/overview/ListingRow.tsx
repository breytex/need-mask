import React from "react";
import { Box, Flex, Text } from "@chakra-ui/core";
import { Supplier } from "../../types/Supplier";

interface ComponentProps {}

type Props = ComponentProps & Supplier;

export const ListingRow = (props: Props) => {
  const { companyName, city, country } = props;
  return (
    <Flex direction="column" shadow="sm" p="4" mb="3">
      <Flex direction="row">
        <Text>{companyName}</Text>
        <Box color="gray.400" ml="2">
          ({city}, {country})
        </Box>
      </Flex>
      <Flex direction="row"></Flex>
    </Flex>
  );
};
