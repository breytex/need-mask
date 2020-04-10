import React, { useCallback } from "react";
import { NextPage } from "next";
import { Flex, Box } from "@chakra-ui/core";
import { ListingRow } from "../../components/Listing/ListingRow";
import { FilterBox } from "../../components/Listing/FilterBox";
import { ListingResponses } from "../../pages/listings";
import { Pagination } from "../chakra/Pagination";
import { LISTINGS_PER_PAGE } from "../../graphql/queries/listings";
import { useRouter } from "next/router";
import queryString from "query-string";

export const ListingPage: NextPage<ListingResponses> = (props) => {
  const router = useRouter();
  const { supplierData, productTypeData } = props;
  const maxPages = Math.ceil(
    supplierData.suppliers_aggregate.aggregate.count / LISTINGS_PER_PAGE
  );

  const { push, query } = router;
  const navigateTo = useCallback(
    (queryParams) => {
      const { page = 1, ...filterParams } = { ...query, ...queryParams };
      const queryParamString =
        Object.keys(filterParams).length > 0
          ? "?" + queryString.stringify(filterParams)
          : "";
      const newUrl = `/listings/[page]${queryParamString}`;
      push(newUrl, newUrl.replace("[page]", page));
    },
    [push, query]
  );

  return (
    <Flex flexDirection={{ base: "column-reverse", md: "row" }}>
      <Box width={{ base: "100%", md: "66%" }} pr="4">
        {supplierData.suppliers.map((supplier) => (
          <ListingRow key={supplier.id} {...supplier} />
        ))}
        <Pagination
          maxPages={maxPages}
          currentPage={parseInt("" + router.query.page)}
          onPageChange={navigateTo}
        />
      </Box>
      <Box width={{ base: "100%", md: "33%" }}>
        <FilterBox
          onFilterChanged={navigateTo}
          productTypes={productTypeData.productTypes}
        />
      </Box>
    </Flex>
  );
};
