import * as React from "react";
import RequestForm from "../../../components/RequestForm";
import SiteHero from "../../../components/SiteHero";
import { NextPage, NextPageContext } from "next";
import { Supplier } from "../../../types/Supplier";
import { GET_SUPPLIER_FN_WITH_PRODUCTS } from "../../../graphql/queries/supplier";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/core";
import Link from "next/link";
import { graphQuery } from "../../../graphql/graphQuery";

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

      <SiteHero
        mt="6"
        textAlign={{ base: "left", md: "center" }}
        title="Request product information"
      />
      <RequestForm
        products={supplier.products}
        supplerId={id}
        supplierCompanyName={supplier.companyName}
      />
    </>
  );
};

Request.getInitialProps = async (context: NextPageContext) => {
  const { query } = context;
  const id = query.id as string;
  const { data } = await graphQuery(GET_SUPPLIER_FN_WITH_PRODUCTS(id));

  return {
    props: {
      id,
      supplier: data.suppliers_by_pk,
    },
  };
};

export default Request;
