import React from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Supplier } from "../../../types/Supplier";
import {
  GET_ALL_SUPPLIER_IDS,
  GET_SUPPLIER_WITH_PRODUCTS,
} from "../../../graphql/queries/supplier";

import { graphQuery } from "../../../graphql/graphQuery";

import { useRouter } from "next/router";
import { Spinner } from "../../../components/chakra/Spinner";
import SupplierDetailPage from "../../../components/supplier-detail-page/SupplierDetailPage";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/core";

type Props = {
  supplier?: Supplier;
};

const SupplierDetailPageContainer: NextPage<Props> = (props) => {
  const { supplier } = props;
  const router = useRouter();
  if (router.isFallback) {
    return <Spinner></Spinner>;
  }
  if (!supplier) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Not found</AlertTitle>
        <AlertDescription>
          The supplier you were looking for could not be found.
        </AlertDescription>
      </Alert>
    );
  }
  return <SupplierDetailPage supplier={supplier} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(
    "supplliers/index getStaticProps: fetching supplier for SDP: ",
    params.id
  );

  const { data } = await graphQuery(GET_SUPPLIER_WITH_PRODUCTS, {
    supplierId: params.id,
  });
  if (!data || !data.suppliers_by_pk) {
    return {
      props: {
        supplier: null,
      },
    };
  }

  return {
    props: {
      supplier: data.suppliers_by_pk,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  console.log(
    "supplliers/index getStaticPaths: fetching ids of all available suppliers"
  );

  const {
    data: { suppliers },
  } = await graphQuery(GET_ALL_SUPPLIER_IDS);

  const paths = suppliers.map(({ id }) => ({ params: { id } }));

  return {
    paths,
    fallback: true,
  };
};

export default SupplierDetailPageContainer;
