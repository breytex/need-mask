import * as React from "react";
import { NextPage } from "next";
import { Box, Flex, Text, Button, Image, Heading } from "@chakra-ui/core";
import Link from "next/link";
import SiteHero from "../components/SiteHero";
import ProductCapacityStats from "../components/ProductCapacityStats";
import { GET_CAPACITY_PER_PRODUCT } from "../graphql/queries/capacity";
import { Capacity, CapacityResponse } from "../types/Capacity";
import { graphQuery } from "../graphql/graphQuery";

type Props = {
  capacities: Capacity[];
};

const marginButton = { mx: { base: "auto", md: "8" } };
const svgHeight = 250;

const Headline = ({ children, ...props }) => (
  <Text fontSize="lg" fontWeight="bold" color="blue.600" mx="8" {...props}>
    {children}
  </Text>
);

const Paragraph = ({ children }) => (
  <Text mx="8" mb="8" mt="4" fontSize="lg">
    {children}
  </Text>
);

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

      <Box maxWidth="900px" mx="auto">
        <Flex
          textAlign="center"
          mb="8rem"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box flex={3}>
            <Image src="/images/deliveries.svg" height={svgHeight} mx="auto" />
          </Box>

          <Box
            flex={3}
            textAlign={{ base: "center", md: "left" }}
            mt={{ base: "8", md: "6" }}
            maxW="600px"
            mx="auto"
          >
            <Headline>Are you a supplier?</Headline>
            <Paragraph>
              If you are a reliable producer or vendor of protective gear click
              here to list the protective gear that you SUPPLY
            </Paragraph>

            <Button size="lg" variantColor="blue" {...marginButton}>
              <Link href="/suppliers/register">
                <a>I supply protective gear and masks</a>
              </Link>
            </Button>
          </Box>
        </Flex>

        {/* <Flex
          textAlign="center"
          mb="8rem"
          flexDirection={{ base: "column-reverse", md: "row" }}
        >
          <Box
            flex={3}
            textAlign={{ base: "center", md: "right" }}
            mt={{ base: "8", md: "6" }}
            maxW="600px"
            mx="auto"
          >
            <Headline>Do you need gear?</Headline>
            <Paragraph>
              If you NEED masks and other protective equipment find a reliable
              supplier here.
            </Paragraph>

            <Button size="lg" variantColor="blue" {...marginButton}>
              <Link href="/suppliers">
                <a>I need masks</a>
              </Link>
            </Button>
          </Box>
          <Box flex={3}>
            <Image
              src="/images/undraw_medical_research.svg"
              height={svgHeight}
              mx="auto"
            />
          </Box>
        </Flex> */}

        <Flex
          textAlign="center"
          mb="8rem"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box flex={3}>
            <Image
              src="/images/social_distancing.svg"
              height={svgHeight}
              mx="auto"
              transform="scale(-1,1)"
            />
          </Box>

          <Box
            flex={3}
            textAlign={{ base: "center", md: "left" }}
            pt="4"
            maxW="600px"
            mx="auto"
          >
            <Headline>You can support us!</Headline>
            <Paragraph>
              Safe lives! Help medical professionals in poor countries with weak
              healthcare infrastructure. Click here to DONATE masks and
              protective equipment to those in need.
            </Paragraph>

            <Button size="lg" variantColor="blue" {...marginButton}>
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
  const response = await graphQuery<CapacityResponse>(GET_CAPACITY_PER_PRODUCT);
  const {
    data: {
      productTypes_aggregate: { nodes },
    },
  } = response;

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
