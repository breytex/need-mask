import * as React from "react";
import Link from "next/link";
import { Box, Flex, Heading, Image, Button } from "@chakra-ui/core";
import { useRouter } from "next/router";

const SiteHeader: React.FC = () => {
  const router = useRouter();

  return (
    <Box backgroundColor="white" w="100%">
      <Flex
        justify="space-between"
        w="100%"
        maxW="1332px"
        py="2"
        mx="auto"
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
            <Button variant="outline" onClick={() => router.push("/suppliers")}>
              Need
            </Button>
          </Box>
          <Box ml={2}>
            <Button
              variantColor="blue"
              onClick={() => router.push("/suppliers/register")}
            >
              Supply
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SiteHeader;
