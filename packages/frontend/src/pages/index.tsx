import * as React from "react";
import { NextPage } from "next";
import { Button, Flex, Box } from "@chakra-ui/core";
import { mockListing } from "../types/Listing";
import { ListingRow } from "../components/overview/ListingRow";
import { FilterBox } from "../components/overview/FilterBox";

const Home: NextPage = () => {
  return (
    <Flex flexDirection={{ base: "column-reverse", md: "row" }}>
      <Box width={{ base: "100%", md: "66%" }} pr="4">
        <ListingRow {...mockListing} />
        <ListingRow {...mockListing} />
        <ListingRow {...mockListing} />
        <ListingRow {...mockListing} />
        <ListingRow {...mockListing} />
        <ListingRow {...mockListing} />
      </Box>
      <Box width={{ base: "100%", md: "33%" }}>
        <FilterBox onFilterChanged={() => {}}></FilterBox>
      </Box>
    </Flex>
  );
};

export default Home;
