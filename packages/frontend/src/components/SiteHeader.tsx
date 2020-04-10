import * as React from "react";
import { Box, Flex, Heading, Image } from "@chakra-ui/core";
import Link from "next/link";

const SiteHeader: React.FC = ({}) => {
  return (
    <Box m={2}>
      <Link href="/">
        <a>
          <Flex align="center">
            <Image
              src="/images/logo.png"
              alt="need-mask.com"
              size="40px"
              m={2}
            />
            <Heading size="lg" letterSpacing="-.1rem">
              need-mask.com
            </Heading>
          </Flex>
        </a>
      </Link>
    </Box>
  );
};

export default SiteHeader;
