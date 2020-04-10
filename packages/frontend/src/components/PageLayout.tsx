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
      <SiteHeader />
      <Flex justify="center" flex="1">
        <Box w="100%" maxW="1332px" p="4">
          {children}
        </Box>
      </Flex>
      <SiteFooter />
    </Flex>
  );
}
