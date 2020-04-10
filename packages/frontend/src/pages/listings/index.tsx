import { NextPage } from "next";
import { withUrqlClient, NextUrqlPageContext } from "next-urql";
import {
  GET_LISTINGS_FN,
  LISTINGS_PER_PAGE,
} from "../../graphql/queries/listings";
import { urqlConfig } from "../../graphql/urqlConfig";
import { GET_PRODUCT_TYPES } from "../../graphql/queries/products";
import { Supplier, ProductType } from "../../types/Supplier";
import { ListingPage } from "../../components/Listing/ListingPage";

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

type Context = NextUrqlPageContext;

export const listingInitialProps = async function (ctx: Context) {
  const { urqlClient, query } = ctx;
  const currentPage: number = parseInt("" + query.page || "1");
  const productFilter = query.products ? ("" + query.products).split(",") : [];

  let listingValues = {
    offset: (currentPage - 1) * LISTINGS_PER_PAGE,
  };

  const { data: supplierData } = await urqlClient
    .query(GET_LISTINGS_FN(productFilter), listingValues)
    .toPromise();

  const { data: productTypeData } = await urqlClient
    .query(GET_PRODUCT_TYPES)
    .toPromise();

  return {
    supplierData,
    productTypeData,
  };
};

Listings.getInitialProps = listingInitialProps;

export default withUrqlClient(urqlConfig)(Listings);
