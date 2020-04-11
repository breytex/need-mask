import * as React from "react";
import Link from "next/link";
import { Box, Flex, Heading, Image, Button } from "@chakra-ui/core";

const SiteHeader: React.FC = () => {
  return (
    <Flex
      justify="space-between"
      w="100%"
      maxW="1332px"
      py="4"
      px={{ base: "2", md: "4" }}
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

      <Flex align="center">
        <Box m={2}>
          <Link href="/suppliers">
            <a>Suppliers</a>
          </Link>
        </Box>
        <Box m={2}>
          <Button
            variantColor="blue"
            onClick={() => alert("Please contact us (somehow)")}
          >
            I am a Supplier
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default SiteHeader;
