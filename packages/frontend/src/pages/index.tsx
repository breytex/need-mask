import * as React from "react";
import { NextPage } from "next";
import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/core";

const Home: NextPage = () => {
  return (
    <div>
      <Box maxWidth="36rem" textAlign="center" mx="auto" my="3rem">
        <Heading as="h1" mb={4} fontWeight="500">
          You NEED or PRODUCE protective masks?
        </Heading>
        <Heading as="h3" size="lg" mb={4} fontWeight="normal">
          Register yourself and receive or provide help
        </Heading>
        <Text>
          In recent days the request for medical masks and protective wear
          across Europe has risen due to the spread of COVID-19. We want to help
          providing a connection between NEED and SUPPLY of protective wear,
          especially face masks.
        </Text>
      </Box>

      <Flex mb={8}>
        <Box flex={1} textAlign="center">
          <Image src="/images/deliveries.svg" height={200} mx="auto" />
          <Button variantColor="blue" m={8} mx="auto">
            I supply masks
          </Button>
        </Box>
        <Box flex={1} textAlign="center">
          <Image src="/images/search.svg" height={200} mx="auto" />
          <Button variantColor="blue" m={8} mx="auto">
            I need masks
          </Button>
        </Box>
      </Flex>
    </div>
  );
};

export default Home;
