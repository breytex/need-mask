import React, { useCallback } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import queryString from "query-string";
import { Flex, Box, Heading } from "@chakra-ui/core";
import { ListingRow } from "../../components/Listing/ListingRow";
import { FilterBox } from "../../components/Listing/FilterBox";
import { ListingResponses } from "../../pages/suppliers";
import { Pagination } from "../chakra/Pagination";
import { NoResults } from "./NoResults";
import { LISTINGS_PER_PAGE } from "../../graphql/queries/listings";
import Headline from "../chakra/Headline";

export const ListingPage: NextPage<ListingResponses> = (props) => {
  const router = useRouter();
  const { supplierData, productTypeData } = props;
  const maxPages = Math.ceil(
    supplierData.suppliers_aggregate.aggregate.count / LISTINGS_PER_PAGE
  );

  const { replace, query } = router;
  const navigateTo = (queryParams) => {
    const params = { ...query, ...queryParams };
    if (!params.page) {
      params.page = 1;
    }
    const queryParamString =
      Object.keys(params).length > 0 ? "?" + queryString.stringify(params) : "";
    const newUrl = `/suppliers${queryParamString}`;
    replace(newUrl, newUrl);
  };

  const currentPage = parseInt("" + router.query.page) || 1;
  const hasResults =
    supplierData.suppliers && supplierData.suppliers.length > 0;

  return (
    <React.Fragment>
      <Flex flexDirection={{ base: "column", md: "row" }}>
        <Box width={{ base: "100%", md: "25%" }}>
          <Headline>Tell us, what you need</Headline>
          <FilterBox
            onFilterChanged={navigateTo}
            productTypes={productTypeData.productTypes}
          />
        </Box>
        <Box
          width={{ base: "100%", md: "75%" }}
          pl={{ base: "0", md: "8", lg: "12" }}
          mt={{ base: "10", md: "0" }}
        >
          <Headline>Find suppliers that meet your needs</Headline>
          {hasResults &&
            supplierData.suppliers.map((supplier) => (
              <ListingRow key={supplier.id} {...supplier} />
            ))}
          {!hasResults && <NoResults />}
          <Pagination
            maxPages={maxPages}
            currentPage={currentPage}
            onPageChange={navigateTo}
            mt="4"
          />
        </Box>
      </Flex>
    </React.Fragment>
  );
};
