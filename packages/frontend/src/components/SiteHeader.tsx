import * as React from "react";
import Link from "next/link";
import { Box, Flex, Heading, Image, Button } from "@chakra-ui/core";
import { useRouter } from "next/router";
import LinkButton from "./chakra/LinkButton";

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
          <Box ml={2}>
            <LinkButton variant="outline" href="/suppliers/register">
              Supply
            </LinkButton>
          </Box>
          <Box m={2}>
            <LinkButton variantColor="blue" href="/suppliers">
              Need
            </LinkButton>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SiteHeader;
