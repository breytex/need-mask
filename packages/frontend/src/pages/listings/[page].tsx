import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { urqlConfig } from "../../graphql/urqlConfig";
import { ListingPage } from "../../components/Listing/ListingPage";
import { listingInitialProps, ListingResponses } from ".";

// This file is a duplicated to `index.tsx` because
// shitty nextJs does not support "main" pages (`/listings/`) for param pages

const Listings: NextPage<ListingResponses> = ListingPage;

Listings.getInitialProps = listingInitialProps;

export default withUrqlClient(urqlConfig)(Listings);
