import React, { useCallback } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import queryString from "query-string";
import { Flex, Box } from "@chakra-ui/core";
import { ListingRow } from "../../components/Listing/ListingRow";
import { FilterBox } from "../../components/Listing/FilterBox";
import { ListingResponses } from "../../pages/listings";
import { Pagination } from "../chakra/Pagination";
import { NoResults } from "./NoResults";
import { LISTINGS_PER_PAGE } from "../../graphql/queries/listings";

export const ListingPage: NextPage<ListingResponses> = (props) => {
  const router = useRouter();
  const { supplierData, productTypeData } = props;
  const maxPages = Math.ceil(
    supplierData.suppliers_aggregate.aggregate.count / LISTINGS_PER_PAGE
  );

  const { push, query } = router;
  const navigateTo = (queryParams) => {
    const { page = 1, ...filterParams } = { ...query, ...queryParams };
    const queryParamString =
      Object.keys(filterParams).length > 0
        ? "?" + queryString.stringify(filterParams)
        : "";
    const newUrl = `/listings/[page]${queryParamString}`;
    push(newUrl, newUrl.replace("[page]", page));
  };

  const currentPage = parseInt("" + router.query.page) || 1;
  const hasResults =
    supplierData.suppliers && supplierData.suppliers.length > 0;

  return (
    <Flex flexDirection={{ base: "column-reverse", md: "row" }}>
      <Box
        width={{ base: "100%", md: "66%" }}
        pr={{ base: "0", md: "5", lg: "8" }}
        mt={{ base: "6", md: "0" }}
      >
        <Pagination
          maxPages={maxPages}
          currentPage={currentPage}
          onPageChange={navigateTo}
          mb="2"
        />
        {hasResults &&
          supplierData.suppliers.map((supplier) => (
            <ListingRow key={supplier.id} {...supplier} />
          ))}
        {!hasResults && <NoResults />}
        <Pagination
          maxPages={maxPages}
          currentPage={currentPage}
          onPageChange={navigateTo}
          mt="2"
        />
      </Box>
      <Box width={{ base: "100%", md: "33%" }} pt={{ base: "0", md: "50px" }}>
        <FilterBox
          onFilterChanged={navigateTo}
          productTypes={productTypeData.productTypes}
        />
      </Box>
    </Flex>
  );
};
