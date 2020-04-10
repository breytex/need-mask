import * as React from "react";
import { Box, Flex, Heading, Image, Button } from "@chakra-ui/core";
import Link from "next/link";

const SiteHeader: React.FC = ({}) => {
  return (
    <Flex
      justify="space-between"
      w="100%"
      maxW="1332px"
      py="4"
      px={{ base: "4", md: "2" }}
    >
      <Link href="/">
        <a>
          <Flex align="center">
            <Image src="/images/logo.png" alt="need-mask.com" size="50px" />
            <Heading color="gray.700" ml="4" size="lg" letterSpacing="-.1rem">
              need-mask.com
            </Heading>
          </Flex>
        </a>
      </Link>
      <Box>
        <Button size="lg" variantColor="blue" mr={{ base: "0", md: "5" }}>
          I am a supplier
        </Button>
      </Box>
    </Flex>
  );
};

export default SiteHeader;
