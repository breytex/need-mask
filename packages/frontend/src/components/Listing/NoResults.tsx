import React from "react";
import { Text, Flex, Icon } from "@chakra-ui/core";
import { useMediaQuery } from "../../chakra/useMediaQuery";
interface Props {}

export const NoResults = (props: Props) => {
  const arrowIcon = useMediaQuery(["arrow-up", "arrow-back"]);
  return (
    <Flex
      ml={{ base: "0", md: "10" }}
      flexDirection={{ base: "column-reverse", md: "row" }}
      alignItems="center"
    >
      <Flex
        direction="column"
        mr={{ base: "", md: "16" }}
        justify="center"
        mt="2"
      >
        <Text fontSize={{ base: "30px", md: "40px" }}>
          <Icon name={arrowIcon} size="50px" /> Try to adjust filters
        </Text>
        <Text fontSize="lg">
          There are no results for your filter settings just yet.
        </Text>
      </Flex>
      <Text fontSize="100px" fontWeight="semibold">
        :(
      </Text>
    </Flex>
  );
};
