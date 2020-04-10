import * as React from "react";
import { Box, Flex, Heading, Button } from "@chakra-ui/core";

const SiteFooter: React.FC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="gray.700"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          need-mask.com
        </Heading>
      </Flex>

      <Box
        display={{ sm: "block", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <div>AGB</div>
        <div>Test</div>
        <div>Anderer Link</div>
      </Box>
    </Flex>
  );
};

export default SiteFooter;
