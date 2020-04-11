import React from "react";
import { Text, Flex, Icon } from "@chakra-ui/core";
import { useMediaQuery } from "../../chakra/useMediaQuery";
interface Props {}

export const NoResults = (props: Props) => {
  const arrowIcon = useMediaQuery(["arrow-up", "arrow-forward"]);
  return (
    <Flex
      justify="center"
      flexDirection={{ base: "column-reverse", md: "row" }}
      alignItems="center"
    >
      <Text fontSize="100px" fontWeight="semibold">
        :(
      </Text>
      <Flex
        direction="column"
        ml={{ base: "", md: "16" }}
        justify="center"
        mt="2"
      >
        <Text fontSize={{ base: "30px", md: "40px" }}>
          Try to adjust filters <Icon name={arrowIcon} size="50px" />
        </Text>
        <Text fontSize="lg">
          There are no results for your filter settings just yet.
        </Text>
      </Flex>
    </Flex>
  );
};
