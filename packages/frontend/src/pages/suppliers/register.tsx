import React from "react";
import { NextPage, NextPageContext } from "next";

import {
  GET_PRODUCT_TYPES,
  ProductTypeResponse,
} from "../../graphql/queries/products";

import { ADD_SUPPLIER } from "../../graphql/mutations/addSupplier";

import SuccessMessage from "../../components/chakra/SuccessMessage";
import SiteHero from "../../components/SiteHero";
import SupplierForm from "./SupplierForm";
import { graphQuery } from "../../graphql/graphQuery";
import { useMutation } from "../../hooks/useMutation";

type Props = NextPage<ProductTypeResponse>;

const Register: Props = (props) => {
  const { trigger: mutateSupplier, data, isLoading, errors } = useMutation(
    ADD_SUPPLIER
  );
  const { productTypes } = props;

  if (data) {
    return (
      <SuccessMessage
        title="Thanks!"
        buttonTitle="Back to suppliers"
        onClickPath="/suppliers"
      >
        You have successfuly submitted your listing to need-mask.com. Our
        moderators will now review your submission and notify you via email.
      </SuccessMessage>
    );
  }

  return (
    <>
      <SiteHero
        title="Register as a Supplier"
        description="Be part of our supplier base. In case you match a request, your contact data will be shared with the potential client."
      />
      <SupplierForm
        error={errors}
        mutateSupplier={mutateSupplier}
        productTypes={productTypes}
        isLoading={isLoading}
      />
    </>
  );
};

export const listingInitialProps = async function (ctx: NextPageContext) {
  const { data: productTypeData } = await graphQuery(GET_PRODUCT_TYPES);

  return {
    productTypes: productTypeData.productTypes,
  };
};

Register.getInitialProps = listingInitialProps;

export default Register;
