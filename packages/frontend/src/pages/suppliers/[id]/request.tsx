import * as React from "react";
import RequestForm from "../../../components/RequestForm";
import SiteHero from "../../../components/SiteHero";
import { NextPage } from "next";
import { Supplier } from "../../../types/Supplier";
import { NextUrqlPageContext, withUrqlClient } from "next-urql";
import { urqlConfig } from "../../../graphql/urqlConfig";
import { GET_SUPPLIER_FN_WITH_PRODUCTS } from "../../../graphql/queries/supplier";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/core/dist";
import Link from "next/link";

type Props = {
  props: {
    id: string;
    supplier: Supplier;
  };
};

export const Request: NextPage<Props> = ({ props: { id, supplier } }) => {
  return (
    <>
      <Breadcrumb fontSize="sm">
        <BreadcrumbItem>
          <Link href="/suppliers">
            <BreadcrumbLink>Suppliers</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <Link href={`/suppliers/${supplier.id}`}>
            <BreadcrumbLink href="#">{supplier.companyName}</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Request</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <SiteHero title="Request product information" />
      <RequestForm products={supplier.products} supplerId={id} />
    </>
  );
};

Request.getInitialProps = async (context: NextUrqlPageContext) => {
  const { query, urqlClient } = context;
  const id = query.id as string;
  const { data } = await urqlClient
    .query(GET_SUPPLIER_FN_WITH_PRODUCTS(id))
    .toPromise();

  return {
    props: {
      id,
      supplier: data.suppliers_by_pk,
    },
  };
};

export default withUrqlClient(urqlConfig())(Request);
