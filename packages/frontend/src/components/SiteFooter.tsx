import * as React from "react";
import { Box, Flex, Heading, Button } from "@chakra-ui/core";

const SiteFooter: React.FC = () => {
  return (
    <Box p={6} bg="gray.700" color="white">
      <Box
        w="100%"
        maxW="1332px"
        mx="auto"
        display={{ sm: "block", md: "flex" }}
      >
        <Flex align="center" mr={5} flex={1}>
          <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
            need-mask.com
          </Heading>
        </Flex>

        <Box
          display={{ sm: "block", md: "flex" }}
          width={{ sm: "full", md: "auto" }}
          alignItems="center"
        >
          <Box pr={2}>AGB</Box>
          <Box pr={2}>Imprint</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SiteFooter;
