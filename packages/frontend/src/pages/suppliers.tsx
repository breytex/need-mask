import {
  NextPage,
  NextPageContext,
  GetStaticPaths,
  GetStaticProps,
} from "next";
import {
  GET_LISTINGS_FN,
  GET_LISTINGS_COUNT_FN,
  LISTINGS_PER_PAGE,
} from "../graphql/queries/listings";
import { Supplier } from "../types/Supplier";
import { ListingPage } from "../components/supplier-overview/ListingPage";
import { graphQuery } from "../graphql/graphQuery";
import { get } from "lodash";

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

// export const listingInitialProps = async function (ctx: NextPageContext) {
//   const { query } = ctx;
//   const currentPage: number = parseInt("" + query.page || "1");
//   const productFilter = query.products ? ("" + query.products).split(",") : [];
//   const continentFilter = query.continent ? "" + query.continent : undefined;

//   let listingValues = {
//     offset: (currentPage - 1) * LISTINGS_PER_PAGE,
//   };

//   const { data: supplierData } = await graphQuery(
//     GET_LISTINGS_FN(productFilter, continentFilter),
//     listingValues
//   );

//   return {
//     supplierData,
//   };
// };

// Listings.getInitialProps = listingInitialProps;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(
    "supplliers/overview getStaticProps: fetching supplier for SDP: ",
    params.id
  );
  const currentPage: number = parseInt("" + params.page || "1");
  const productFilter = params.products
    ? ("" + params.products).split(",")
    : [];

  let listingValues = {
    offset: (currentPage - 1) * LISTINGS_PER_PAGE,
  };

  const { data } = await graphQuery(
    GET_LISTINGS_FN(productFilter),
    listingValues
  );

  // if (!data || !data.suppliers_by_pk) {
  //   return {
  //     props: {
  //       supplier: null,
  //     },
  //   };
  // }

  return {
    props: {
      supplierData: data,
    },
  };
};

const filterPermutation = [
  "",
  "Mask",
  "Mask,Clothing",
  "Headgear",
  "Clothing",
  "Mask,Headgear",
  "Headgear,Clothing",
  "Mask,Headgear,Clothing",
];

export const getStaticPaths: GetStaticPaths = async () => {
  console.log(
    "supplliers/overview getStaticPaths: fetching ids of all available suppliers"
  );

  let paths = [];

  for (const filter of filterPermutation) {
    const response = await graphQuery(GET_LISTINGS_COUNT_FN(filter.split(",")));
    const count = get(response, "data.suppliers_aggregate.aggregate.count", 1);
    const maxPages = Math.ceil(count / LISTINGS_PER_PAGE);

    for (let i = 1; i <= maxPages; i++) {
      paths.push({ params: { page: i, products: filter } });
    }
  }

  console.log({ paths });
  return {
    paths,
    fallback: false,
  };
};

export default Listings;
