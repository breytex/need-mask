import React from "react";
import { NextPage, NextPageContext } from "next";
import { Supplier } from "../../../types/Supplier";
import { GET_SUPPLIER_WITH_PRODUCTS } from "../../../graphql/queries/supplier";

import { graphQuery } from "../../../graphql/graphQuery";

import SupplierDetailPage from "../../../components/supplier-detail-page/SupplierDetailPage";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/core";
import PageHead from "../../../components/PageHead";
import { redirect } from "../../../helpers/redirect";

type Props = {
  id: string;
  supplier?: Supplier;
};

const SupplierDetailPageContainer: NextPage<Props> = (props) => {
  const { supplier } = props;

  if (!supplier) {
    return (
      <>
        <PageHead title="Supplier details" />
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Not found</AlertTitle>
          <AlertDescription>
            The supplier you were looking for could not be found.
          </AlertDescription>
        </Alert>
      </>
    );
  }

  return (
    <>
      <PageHead title="Supplier details" />
      <SupplierDetailPage supplier={supplier} />
    </>
  );
};

SupplierDetailPageContainer.getInitialProps = async (
  context: NextPageContext
) => {
  const { query } = context;
  const id = query.id as string;

  const { data } = await graphQuery(
    GET_SUPPLIER_WITH_PRODUCTS,
    {
      supplierId: id,
    },
    { shouldCache: true }
  );

  if (!data || !data.suppliers_by_pk) {
    redirect(context, "/suppliers");
  }

  return {
    id,
    supplier: data.suppliers_by_pk,
  };
};

export default SupplierDetailPageContainer;
