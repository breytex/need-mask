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

const _cache = new Map();
const cacheExpireMS = 1000 * 60 * 10; // 10m
setInterval(() => {
  // console.log("reset");
  _cache.clear();
}, cacheExpireMS);

export const getServerSideProps = async function (ctx: NextPageContext) {
  const { query } = ctx;
  const currentPage: number = parseInt("" + (query.page || "1"));
  const productFilter = query.products ? ("" + query.products).split(",") : [];
  const continentFilter = query.continent ? "" + query.continent : undefined;

  const cacheProductFilterKey = query.products || "none";
  const cacheContinentFilterKey = query.continent || "none";
  const cacheCurrentPageKey = "" + currentPage;
  const cacheKey = `${cacheCurrentPageKey}-${cacheProductFilterKey}-${cacheContinentFilterKey}`;

  const cachedValue = _cache.get(cacheKey);
  if (cachedValue) {
    return {
      props: {
        supplierData: _cache.get(cacheKey),
      },
    };
  }

  let listingValues = {
    offset: (currentPage - 1) * LISTINGS_PER_PAGE,
  };

  // console.log("request", cacheKey);
  const { data: supplierData } = await graphQuery(
    GET_LISTINGS_FN(productFilter, continentFilter),
    listingValues
  );

  _cache.set(cacheKey, supplierData);

  return {
    props: {
      supplierData,
    },
  };
};

export default Listings;
