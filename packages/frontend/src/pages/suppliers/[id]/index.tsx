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
