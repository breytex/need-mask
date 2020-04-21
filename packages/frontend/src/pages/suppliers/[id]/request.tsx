import * as React from "react";
import RequestForm from "../../../components/RequestForm";
import SiteHero from "../../../components/SiteHero";
import { NextPage, NextPageContext } from "next";
import { Supplier } from "../../../types/Supplier";
import { GET_SUPPLIER_FN_WITH_PRODUCTS } from "../../../graphql/queries/supplier";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/core";
import Link from "next/link";
import { graphQuery } from "../../../graphql/graphQuery";
import PageHead from "../../../components/PageHead";
import NotSupportedBrowser from "../../../components/NotSupportedBrowser";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/core";

type Props = {
  props: {
    id: string;
    supplier: Supplier;
  };
};

export const Request: NextPage<Props> = ({ props: { id, supplier } }) => {
  if (!supplier) {
    return (
      <>
        <PageHead title="Supplier details" />
        <Alert
          maxW="300px"
          status="error"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
          mx="auto"
          height="200px"
        >
          <AlertIcon size="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Not found / under review
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            The supplier you were looking for could not be found or awaits
            moderation of our admins.
          </AlertDescription>
        </Alert>
      </>
    );
  }

  return (
    <>
      <NotSupportedBrowser />
      <PageHead title="Supplier: Request a quote" />
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
        description="Your contact details will be shared with the supplier."
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
  console.log(data);
  return {
    props: {
      id,
      supplier: data.suppliers_by_pk,
    },
  };
};

export default Request;
