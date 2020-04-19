import React from "react";
import { NextPage } from "next";
import { productTypes } from "../../graphql/queries/products";
import { ADD_SUPPLIER } from "../../graphql/mutations/addSupplier";
import SuccessMessage from "../../components/chakra/SuccessMessage";
import SiteHero from "../../components/SiteHero";
import { SupplierForm } from "../../components/supplier-register/SupplierForm";
import { useMutation } from "../../hooks/useMutation";
import PageHead from "../../components/PageHead";

const Register: NextPage = () => {
  const { trigger: mutateSupplier, data, isLoading, errors } = useMutation(
    ADD_SUPPLIER
  );

  if (data) {
    return (
      <>
        <PageHead title="Success" />
        <SuccessMessage
          title="Thanks!"
          buttonTitle="Back to suppliers"
          onClickPath="/suppliers"
        >
          You have successfuly submitted your listing to need-mask.com. Our
          moderators will now review your submission and notify you via email.
        </SuccessMessage>
      </>
    );
  }

  return (
    <>
      <PageHead title="Register as supplier" />
      <SiteHero
        title="Register as a Supplier"
        description="Be part of our supplier base. In case you match a request, your contact data will be shared with the potential client."
      />
      <SupplierForm
        errors={errors}
        mutateSupplier={mutateSupplier}
        productTypes={productTypes}
        isLoading={isLoading}
      />
    </>
  );
};

export default Register;
