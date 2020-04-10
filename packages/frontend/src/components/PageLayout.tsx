import React, { ReactElement } from "react";
import { Flex, Box } from "@chakra-ui/core";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
interface Props {
  children: ReactElement;
}

export default function PageLayout(props: Props): ReactElement {
  const { children } = props;

  return (
    <Flex flexDirection="column" minHeight="100%">
      <Flex
        justify="center"
        mt={{ base: "2", md: "8", lg: "12" }}
        mb={{ base: "2", md: "3", lg: "4" }}
      >
        <SiteHeader />
      </Flex>
      <Flex justify="center" flex="1">
        <Box w="100%" maxW="1332px" p="4">
          {children}
        </Box>
      </Flex>
      <SiteFooter />
    </Flex>
  );
}
