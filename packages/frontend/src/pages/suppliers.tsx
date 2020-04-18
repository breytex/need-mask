import { NextPage, NextPageContext } from "next";
import {
  GET_LISTINGS_FN,
  LISTINGS_PER_PAGE,
} from "../graphql/queries/listings";
import { Supplier } from "../types/Supplier";
import { ListingPage } from "../components/supplier-overview/ListingPage";
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

  return {
    supplierData,
  };
};

Listings.getInitialProps = listingInitialProps;

export default Listings;
