import React, { useCallback } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import queryString from "query-string";
import { Flex, Box, Heading, Text } from "@chakra-ui/core";
import { ListingRow } from "../../components/Listing/ListingRow";
import { FilterBox } from "../../components/Listing/FilterBox";
import { ListingResponses } from "../../pages/suppliers";
import { Pagination } from "../chakra/Pagination";
import { NoResults } from "./NoResults";
import { LISTINGS_PER_PAGE } from "../../graphql/queries/listings";
import Headline from "../chakra/Headline";
import { useMediaQuery } from "../../chakra/useMediaQuery";
import Card from "../chakra/Card";

export const ListingPage: NextPage<ListingResponses> = (props) => {
  const router = useRouter();
  const filterBgColor = useMediaQuery(["white", undefined]);
  const filterShadow = useMediaQuery(["md", undefined]);
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
      <Text fontSize="36px" mb="8">
        Discover new suppliers for protective gear
      </Text>

      <Flex flexDirection={{ base: "column", md: "row" }}>
        <Box
          width={{ base: "100%", md: "20%" }}
          p={{ base: "6", md: "0" }}
          border={{ base: "1px solid", md: "initial" }}
          borderColor={{ base: "gray.200", md: "initial" }}
          borderRadius={{ base: "5px", md: "initial" }}
        >
          <FilterBox
            onFilterChanged={navigateTo}
            productTypes={productTypeData.productTypes}
          />
        </Box>
        <Box
          width={{ base: "100%", md: "80%" }}
          pl={{ base: "0", md: "8", lg: "12" }}
          mt={{ base: "10", md: "3px" }}
        >
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
