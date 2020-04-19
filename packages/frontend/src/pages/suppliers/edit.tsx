import React, { useEffect } from "react";
import { NextPage, NextPageContext } from "next";

import { productTypes } from "../../graphql/queries/products";

import { UPDATE_SUPPLIER } from "../../graphql/mutations/addSupplier";
import { Spinner } from "../../components/chakra/Spinner";
import { cloneDeepWith } from "lodash";

import SuccessMessage from "../../components/chakra/SuccessMessage";
import SiteHero from "../../components/SiteHero";
import { SupplierForm } from "../../components/supplier-register/SupplierForm";
import { useRouter } from "next/router";
import { GET_FULL_SUPPLIER_WITH_PRODUCTS } from "../../graphql/queries/supplier";
import { redirect } from "../../helpers/redirect";
import { PRODUCT_FORM_FIELD_NAME } from "../../components/supplier-register/ProductConfigurator";
import queryString from "query-string";
import { useQuery } from "../../hooks/useQuery";
import { useMutation } from "../../hooks/useMutation";
import { useCsr } from "../../hooks/useCsr";
import PageHead from "../../components/PageHead";

type Props = NextPage;

const filesFields = ["productImage", "packageImage", "certificateFile"];

const transformSupplierDataToFormState = (supplierData) => {
  const defaultValues = cloneDeepWith(supplierData);
  let productCount = 0;
  defaultValues[PRODUCT_FORM_FIELD_NAME] = supplierData.products
    .map((product) => product.typeId + "--" + productCount++)
    .join(",");

  defaultValues.products = { data: {} };

  productCount = 0;
  supplierData.products.forEach((product) => {
    // Get file names from file object structure
    filesFields.forEach((filesField) => (product[filesField] = ""));
    product.files.forEach((element) => {
      const { fileKind, url, id } = element.file;
      product[fileKind] = url;
      product[`${fileKind}-id`] = id;
    });
    defaultValues.products.data[
      product.typeId + "--" + productCount++
    ] = product;
  });

  return defaultValues;
};

const EditFormPage = (props) => {
  const {
    trigger: mutateSupplier,
    data,
    isLoading,
    errors,
  } = useMutation(UPDATE_SUPPLIER, { auth: true });

  const router = useRouter();
  const { supplierId } = router.query;
  const { productTypes, supplierData } = props;

  const defaultValues = transformSupplierDataToFormState(supplierData);

  const mutateSupplierFn = ({ data }) => {
    mutateSupplier({ data: { ...data, id: supplierId }, supplierId });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (data) {
    return (
      <>
        <PageHead title="Success" />
        <SuccessMessage
          title="Thanks!"
          buttonTitle="Back to mainpage"
          onClickPath="/"
        >
          You have successfuly submitted updated listing to need-mask.com. Our
          moderators will now review your submission and notify you via email.
        </SuccessMessage>
      </>
    );
  }
  return (
    <>
      <PageHead title="Edit your listing" />
      <SiteHero
        title="Edit your listing"
        description="Change your listing below. Our moderators will review your changes in the next 48 houres. Your listing will be offline in the meantime."
      />
      <SupplierForm
        errors={errors}
        mutateSupplier={mutateSupplierFn}
        productTypes={productTypes}
        defaultValues={defaultValues}
        isEdit={true}
      />
    </>
  );
};

const Edit: Props = (props) => {
  const router = useRouter();
  const { supplierId, email } = router.query;

  const [data, isLoading, errors] = useQuery(
    GET_FULL_SUPPLIER_WITH_PRODUCTS("" + supplierId),
    { auth: true }
  );

  // If no jwt is found in local storage, or request to fetch supplier data fails,
  // redirect to login page
  useEffect(() => {
    if (errors.length) {
      // setAccessToken("");
      const params = queryString.stringify({ supplierId, email });
      router.push(`/auth/login?${params}`);
    }
  }, [errors]);

  if (isLoading || !data) {
    return <Spinner />;
  }

  return (
    <EditFormPage
      productTypes={productTypes}
      supplierData={data.suppliers_by_pk}
    />
  );
};

export default Edit;
