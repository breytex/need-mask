import * as React from "react";
import { Heading, Text } from "@chakra-ui/core";
import SiteHero from "../components/SiteHero";
import { Box } from "@chakra-ui/core/dist";
import { NextPage } from "next";

const Privacy: NextPage = () => {
  return (
    <>
      <SiteHero title="Privacy" />
      <Box maxWidth="600px" mx="auto">
        <Heading as="h4" size="sm">
          some heading
        </Heading>
        <Text mb={4}>some text</Text>
      </Box>
    </>
  );
};

export default Privacy;
