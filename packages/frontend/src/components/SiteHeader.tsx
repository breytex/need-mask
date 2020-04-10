import * as React from "react";
import { Flex } from "@chakra-ui/core/dist";
import Link from "next/link";

const SiteHeader: React.FC = ({ children }) => {
  return (
    <Flex as="nav" justify="center" m={2}>
      <Link href="/">
        <a>
          <img src="/images/logo.png" alt="need-mask.com" width="60" />
        </a>
      </Link>
    </Flex>
  );
};

export default SiteHeader;
