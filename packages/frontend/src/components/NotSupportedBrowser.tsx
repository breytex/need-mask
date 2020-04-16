import React, { ReactElement } from "react";
import { Box, Heading, Flex, Icon } from "@chakra-ui/core";
import LinkButton from "./chakra/LinkButton";
import Link from "next/link";

export default function NotSupportedBrowser(): ReactElement {
  return (
    <Box className="NotSupportedBrowser">
      <Flex flexDirection="column" alignItems="center">
        <Icon name="warning" size="5em" color="red.400" mb="4" />
        <Heading>Your browser is not supported</Heading>
        <Heading size="sm" mb="4">
          Please download one of those supported browsers here
        </Heading>
        <Flex>
          <a target="_blank" href="https://www.google.com/chrome/">
            <img src="/images/browsers/chrome.svg" />
          </a>
          <a target="_blank" href="https://www.mozilla.org/">
            <img src="/images/browsers/firefox.svg" />
          </a>
          <a target="_blank" href="https://support.apple.com/downloads/safari">
            <img src="/images/browsers/safari.svg" />
          </a>
          <a target="_blank" href="https://brave.com/">
            <img src="/images/browsers/brave.svg" />
          </a>
        </Flex>
      </Flex>
    </Box>
  );
}
