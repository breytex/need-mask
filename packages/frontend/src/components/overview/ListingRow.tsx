import React from "react";
import { Listing } from "../../types/Listing";
import { Box, Flex, Icon, Text } from "@chakra-ui/core";
interface ComponentProps {}

type Props = ComponentProps & Listing;

export const ListingRow = (props: Props) => {
  const { company, products, location } = props;
  return (
    <Flex direction="column" shadow="sm" p="4" mb="3">
      <Flex direction="row">
        <Text>{company}</Text>
        <Box color="gray.400" ml="2">
          ({location})
        </Box>
      </Flex>
      <Flex direction="row"></Flex>
    </Flex>
  );
};
