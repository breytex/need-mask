import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import queryString from "query-string";
import { Flex, Box } from "@chakra-ui/core";
import { ListingRow } from "./ListingRow";
import { FilterBox } from "./FilterBox";
import { ListingResponses } from "../../pages/suppliers";
import { Pagination } from "../chakra/Pagination";
import { NoResults } from "./NoResults";
import { LISTINGS_PER_PAGE } from "../../graphql/queries/listings";
import { useMediaQuery } from "../../chakra/useMediaQuery";
import PageTitle from "../chakra/PageTitle";
import { StickyContainer, Sticky } from "react-sticky";
import PageHead from "../PageHead";

export const ListingPage: NextPage<ListingResponses> = (props) => {
  const router = useRouter();
  const shouldStick = useMediaQuery([false, true]);

  const { supplierData } = props;
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
      <PageHead title="Discover suppliers" />
      <PageTitle>Discover new suppliers for protective gear</PageTitle>
      <StickyContainer>
        <Flex flexDirection={{ base: "column", md: "row" }}>
          <Box width={{ base: "100%", md: "20%" }}>
            <Sticky className="Sticky" disableCompensation={!shouldStick}>
              {({ style, isSticky }) => (
                <div style={shouldStick ? style : {}}>
                  <Box
                    p={{ base: "6", md: "0" }}
                    mt={isSticky ? "4" : "0"}
                    border={{ base: "1px solid", md: "initial" }}
                    borderColor={{ base: "gray.200", md: "initial" }}
                    borderRadius={{ base: "5px", md: "initial" }}
                  >
                    <FilterBox onFilterChanged={navigateTo} />
                  </Box>
                </div>
              )}
            </Sticky>
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
      </StickyContainer>
    </React.Fragment>
  );
};
