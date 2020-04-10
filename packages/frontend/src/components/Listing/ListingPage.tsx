import * as React from "react";
import { NextPage } from "next";
import { Flex, Box } from "@chakra-ui/core";
import { ListingRow } from "../../components/Listing/ListingRow";
import { FilterBox } from "../../components/Listing/FilterBox";
import { ListingResponses } from "../../pages/listings";
import { Pagination } from "../chakra/Pagination";
import { LISTINGS_PER_PAGE } from "../../graphql/queries/listings";
import { useRouter } from "next/router";

export const ListingPage: NextPage<ListingResponses> = (props) => {
  const router = useRouter();
  const { supplierData, productTypeData, currentPage } = props;
  const maxPages = Math.ceil(
    supplierData.suppliers_aggregate.aggregate.count / LISTINGS_PER_PAGE
  );
  return (
    <Flex flexDirection={{ base: "column-reverse", md: "row" }}>
      <Box width={{ base: "100%", md: "66%" }} pr="4">
        {supplierData.suppliers.map((supplier) => (
          <ListingRow key={supplier.id} {...supplier} />
        ))}
        <Pagination
          maxPages={maxPages}
          currentPage={currentPage}
          path={`/listings/`}
        />
      </Box>
      <Box width={{ base: "100%", md: "33%" }}>
        <FilterBox
          onFilterChanged={() => {}}
          productTypes={productTypeData.productTypes}
        />
      </Box>
    </Flex>
  );
};
