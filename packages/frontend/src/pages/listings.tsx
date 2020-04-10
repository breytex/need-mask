import * as React from "react";
import { NextPage } from "next";
import { Flex, Box } from "@chakra-ui/core";
import { ListingRow } from "../components/overview/ListingRow";
import { FilterBox } from "../components/overview/FilterBox";
import { withUrqlClient, NextUrqlPageContext } from "next-urql";
import { GET_LISTINGS } from "../graphql/queries/listings";
import { urqlConfig } from "../graphql/urqlConfig";
import { GET_PRODUCT_TYPES } from "../graphql/queries/products";
import { Supplier, ProductType } from "../types/Supplier";

interface Responses {
  supplierData: {
    suppliers: Supplier[];
  };
  productTypeData: {
    productTypes: ProductType[];
  };
}

const Listings: NextPage<Responses> = (props) => {
  const { supplierData, productTypeData } = props;

  return (
    <Flex flexDirection={{ base: "column-reverse", md: "row" }}>
      <Box width={{ base: "100%", md: "66%" }} pr="4">
        {supplierData.suppliers.map((supplier) => (
          <ListingRow {...supplier} />
        ))}
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

Listings.getInitialProps = async function (ctx: NextUrqlPageContext) {
  const client = ctx.urqlClient;

  const { data: supplierData } = await client.query(GET_LISTINGS).toPromise();
  const { data: productTypeData } = await client
    .query(GET_PRODUCT_TYPES)
    .toPromise();
  console.log({
    supplierData,
    productTypeData,
  });
  return {
    supplierData,
    productTypeData,
  };
};

export default withUrqlClient(urqlConfig)(Listings);
