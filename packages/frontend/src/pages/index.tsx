import * as React from "react";
import fetch from "isomorphic-unfetch";
import { NextPage } from "next";
import { Box, Flex, Text, Button, Image, Heading } from "@chakra-ui/core";
import Link from "next/link";
import SiteHero from "../components/SiteHero";
import ProductCapacityStats from "../components/ProductCapacityStats";
import { GET_CAPACITY_PER_PRODUCT } from "../graphql/queries/capacity";
import { Capacity, CapacityResponse } from "../types/Capacity";

type Props = {
  capacities: Capacity[];
};

const Home: NextPage<Props> = (props) => {
  const { capacities } = props;

  return (
    <div>
      <SiteHero
        title="You NEED or SUPPLY masks?"
        description="COVID-19 has changed all our lives in the recent weeks. While a
          vaccine is still far away we can only protect ourselves by social
          distancing and by using face masks and other protective equipment."
      />

      <Box maxWidth="700px" mx="auto">
        <Flex
          textAlign="center"
          mb="8rem"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box flex={2}>
            <Image src="/images/deliveries.svg" height={200} mx="auto" />
          </Box>

          <Box flex={3}>
            <Text m={8}>
              If you are a reliable producer or vendor of protective gear click
              here to list the protective gear that you SUPPLY
            </Text>

            <Button variantColor="blue" mx="auto">
              <Link href="/suppliers/register">
                <a>I supply protective gear and masks</a>
              </Link>
            </Button>
          </Box>
        </Flex>

        <Flex
          textAlign="center"
          mb="8rem"
          flexDirection={{ base: "column-reverse", md: "row" }}
        >
          <Box flex={3}>
            <Text m={8}>
              If you NEED masks and other protective equipment find a reliable
              supplier here.
            </Text>

            <Button variantColor="blue" mx="auto">
              <Link href="/suppliers">
                <a>I need masks</a>
              </Link>
            </Button>
          </Box>
          <Box flex={2}>
            <Image
              src="/images/undraw_medical_research.svg"
              height={200}
              mx="auto"
            />
          </Box>
        </Flex>

        <Flex
          textAlign="center"
          mb="8rem"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box flex={2}>
            <Image src="/images/social_distancing.svg" height={200} mx="auto" />
          </Box>

          <Box flex={3}>
            <Text m={8}>
              Safe lives! Help medical professionals in poor countries with weak
              healthcare infrastructure. Click here to DONATE masks and
              protective equipment to those in need.
            </Text>

            <Button variantColor="blue" mx="auto">
              <Link href="/donation">
                <a>I'd like to donate</a>
              </Link>
            </Button>
          </Box>
        </Flex>
      </Box>

      <Box maxWidth="720px" mx="auto" textAlign="center">
        <Heading maxWidth="520px" size="lg" fontWeight="500" mb={12} mx="auto">
          Our suppliers currently provide access to the following weekly
          capacities
        </Heading>

        <ProductCapacityStats items={capacities} />
      </Box>
    </div>
  );
};

export async function getServerSideProps() {
  const response = await fetch(process.env.HASURA_URL, {
    method: "POST",
    body: JSON.stringify({ query: GET_CAPACITY_PER_PRODUCT }),
  });

  const jsonData: CapacityResponse = await response.json();
  const {
    data: {
      productTypes_aggregate: { nodes },
    },
  } = jsonData;

  const capacities = nodes.map((node) => ({
    title: node.title,
    capacity: node.products_aggregate.aggregate.sum.capacity,
  }));

  return {
    props: {
      capacities,
    },
  };
}

export default Home;
