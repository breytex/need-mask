import * as React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/core";
import Link from "next/link";
const Spacer = () => (
  <Text mr="2" ml="2">
    |
  </Text>
);
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
          <Box fontSize="lg">
            <Link href="/about-us">
              <a>About Us</a>
            </Link>
          </Box>
          <Spacer />
          <Box fontSize="lg">
            <Link href="/imprint">
              <a>Imprint</a>
            </Link>
          </Box>
          <Spacer />
          <Box fontSize="lg">
            <Link href="/privacy">
              <a>Privacy</a>
            </Link>
          </Box>
          <Spacer />
          <Box fontSize="lg">
            <Link href="/terms-of-use">
              <a>Terms of use</a>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SiteFooter;
