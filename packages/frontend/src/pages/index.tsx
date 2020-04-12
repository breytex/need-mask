import * as React from "react";
import { NextPage } from "next";
import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/core";
import Link from "next/link";

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
        <Box flex={1} textAlign="center" maxWidth="300px" mx="auto">
          <Image src="/images/deliveries.svg" height={200} mx="auto" />

          <Button variantColor="blue" m={8} mx="auto">
            <Link href="/suppliers/register">
              <a>I supply masks</a>
            </Link>
          </Button>
          <Text>
            Be part of our supplier base. In case you match a request, your
            contact data will be shared with the potential client.
          </Text>
        </Box>
        <Box flex={1} textAlign="center" maxWidth="300px" mx="auto">
          <Image
            src="/images/undraw_medical_research.svg"
            height={200}
            mx="auto"
          />
          <Button variantColor="blue" m={8} mx="auto">
            <Link href="/suppliers/">
              <a>I need masks</a>
            </Link>
          </Button>
          <Text>
            We will collect your demand and communicate it to a suitable
            supplier.
          </Text>
        </Box>
      </Flex>
    </div>
  );
};

export default Home;
