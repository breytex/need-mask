import React, { ReactElement } from "react";
import { Flex, Box } from "@chakra-ui/core";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Testimonials from "./Testimonials";
interface Props {
  children: ReactElement;
}

export default function PageLayout(props: Props): ReactElement {
  const { children } = props;

  return (
    <Flex flexDirection="column" minHeight="100%">
      <Flex justify="center" mb={{ base: "2", md: "3", lg: "4" }}>
        <SiteHeader />
      </Flex>
      <Flex
        justify="center"
        flexGrow={"1" as "initial"}
        justifyContent="center"
      >
        <Box w="100%" maxW="1332px" p={{ base: "3", md: "6", lg: "8" }}>
          {children}
        </Box>
      </Flex>
      <Testimonials />
      <SiteFooter />
    </Flex>
  );
}
