import * as React from "react";
import { NextPage } from "next";
import { Box, Flex, Text, Heading } from "@chakra-ui/core";
import SiteHero from "../components/SiteHero";
import ProductCapacityStats from "../components/ProductCapacityStats";
import { GET_CAPACITY_PER_PRODUCT } from "../graphql/queries/capacity";
import { Capacity, CapacityResponse } from "../types/Capacity";
import { graphQuery, HasuraResponse } from "../graphql/graphQuery";
import LinkButton from "../components/chakra/LinkButton";
import PageHead from "../components/PageHead";

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
      <PageHead title="Welcome" />
      <SiteHero
        title="You NEED or SUPPLY masks?"
        description="COVID-19 has changed all our lives in the recent weeks. While a
          vaccine is still far away we can only protect ourselves by social
          distancing and by using face masks and other protective equipment."
      />

      <Box maxWidth="900px" mx="auto">
        <Flex
          textAlign="center"
          mb={{ base: "3rem", md: "8rem" }}
          flexDirection={{ base: "column", md: "row" }}
          p={{ base: "6", md: "0" }}
          alignItems="center"
        >
          <Box flex={3} mr={{ base: "0", md: "6" }} maxW="450px">
            <img
              style={{ margin: "0 auto" }}
              src="/images/deliveries.svg"
              height={svgHeight}
            />
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
            <Box d={{ base: "none", md: "block" }}>
              <LinkButton
                href="/suppliers/register"
                size="lg"
                variantColor="blue"
                {...marginButton}
              >
                I supply protective gear and masks
              </LinkButton>
            </Box>
            <Box d={{ base: "block", md: "none" }}>
              <LinkButton
                href="/suppliers/register"
                size="lg"
                variantColor="blue"
                {...marginButton}
              >
                I supply gear
              </LinkButton>
            </Box>
          </Box>
        </Flex>

        <Flex
          textAlign="center"
          mb={{ base: "3rem", md: "8rem" }}
          flexDirection={{ base: "column-reverse", md: "row" }}
          p={{ base: "6", md: "0" }}
          alignItems="center"
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

            <LinkButton
              size="lg"
              variantColor="blue"
              href="/suppliers"
              {...marginButton}
            >
              I need masks
            </LinkButton>
          </Box>
          <Box flex={3} ml={{ base: "0", md: "6" }} maxW="450px">
            <img
              style={{ margin: "0 auto" }}
              src="/images/undraw_medical_research.svg"
              height={svgHeight}
            />
          </Box>
        </Flex>

        {/* <Flex
          textAlign="center"
          mb="8rem"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box flex={3}>
            <img
              style={{margin: "0 auto", transform:"scale(-1,1)"}}
              src="/images/social_distancing.svg"
              height={svgHeight}
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

            <LinkButton
              size="lg"
              variantColor="blue"
              href="/donation"
              {...marginButton}
            >
              I'd like to donate
            </LinkButton>
          </Box>
        </Flex> */}

        <Flex
          textAlign="center"
          mb={{ base: "3rem", md: "8rem" }}
          flexDirection={{ base: "column", md: "row" }}
          p={{ base: "6", md: "0" }}
          alignItems="center"
        >
          <Box flex={3} mr={{ base: "0", md: "6" }} maxW="450px">
            <img
              style={{ margin: "0 auto", transform: "scale(-1,1)" }}
              src="/images/team.svg"
              height={svgHeight}
            />
          </Box>

          <Box
            flex={3}
            textAlign={{ base: "center", md: "left" }}
            pt="4"
            maxW="600px"
            mx="auto"
          >
            <Headline>Curious who we are? Want to help?</Headline>
            <Paragraph>
              Let us build a strong community to support people in need of
              protective equipment. Join our movement and be part of our team.
            </Paragraph>

            <LinkButton
              size="lg"
              variantColor="blue"
              href="/about-us"
              {...marginButton}
            >
              Get to know us
            </LinkButton>
          </Box>
        </Flex>
      </Box>

      <Box maxWidth="920px" mx="auto" textAlign="center">
        <Heading maxWidth="520px" size="lg" fontWeight="500" mb={12} mx="auto">
          Our suppliers currently provide access to the following weekly
          capacities
        </Heading>

        <ProductCapacityStats items={capacities} />
      </Box>
    </div>
  );
};

export async function getStaticProps() {
  const { data, errors } = await graphQuery<HasuraResponse<CapacityResponse>>(
    GET_CAPACITY_PER_PRODUCT
  );
  if (errors) {
    throw errors;
  }

  const { nodes } = data.productTypes_aggregate;
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
