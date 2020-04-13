import { NextPage, NextPageContext } from "next";
import {
  GET_LISTINGS_FN,
  LISTINGS_PER_PAGE,
} from "../graphql/queries/listings";
import { GET_PRODUCT_TYPES } from "../graphql/queries/products";
import { Supplier } from "../types/Supplier";
import { ProductType } from "../types/Product";
import { ListingPage } from "../components/Listing/ListingPage";
import { graphQuery } from "../graphql/graphQuery";

export interface ListingResponses {
  supplierData: {
    suppliers: Supplier[];
    suppliers_aggregate: {
      aggregate: {
        count: number;
      };
    };
  };
  productTypeData: {
    productTypes: ProductType[];
  };
}

const Listings: NextPage<ListingResponses> = ListingPage;

export const listingInitialProps = async function (ctx: NextPageContext) {
  const { query } = ctx;
  const currentPage: number = parseInt("" + query.page || "1");
  const productFilter = query.products ? ("" + query.products).split(",") : [];
  const continentFilter = query.continent ? "" + query.continent : undefined;

  let listingValues = {
    offset: (currentPage - 1) * LISTINGS_PER_PAGE,
  };

  const { data: supplierData } = await graphQuery(
    GET_LISTINGS_FN(productFilter, continentFilter),
    listingValues
  );
  const { data: productTypeData } = await graphQuery(GET_PRODUCT_TYPES);

  return {
    supplierData,
    productTypeData,
  };
};

Listings.getInitialProps = listingInitialProps;

export default Listings;
