import React, { useEffect } from "react";
import { NextPage, NextPageContext } from "next";

import {
  GET_PRODUCT_TYPES,
  ProductTypeResponse,
} from "../../graphql/queries/products";

import { UPDATE_SUPPLIER } from "../../graphql/mutations/addSupplier";
import { Spinner } from "../../components/chakra/Spinner";
import { cloneDeepWith } from "lodash";
import { intToString } from "../../helpers/price";

import SuccessMessage from "../../components/chakra/SuccessMessage";
import SiteHero from "../../components/SiteHero";
import SupplierForm from "./SupplierForm";
import { useRouter } from "next/router";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { GET_FULL_SUPPLIER_WITH_PRODUCTS } from "../../graphql/queries/supplier";
import { redirect } from "../../helpers/redirect";
import { PRODUCT_FORM_FIELD_NAME } from "../../components/supplier-register/ProductConfigurator";
import queryString from "query-string";
import { graphQuery } from "../../graphql/graphQuery";
import { useQuery } from "../../hooks/useQuery";
import { useMutation } from "../../hooks/useMutation";

type Props = NextPage<ProductTypeResponse>;

const filesFields = ["productImage", "packageImage", "certificateFile"];

const transformSupplierDataToFormState = (supplierData) => {
  const defaultValues = cloneDeepWith(supplierData);

  defaultValues[PRODUCT_FORM_FIELD_NAME] = supplierData.products
    .map((product) => product.typeId)
    .join(",");

  defaultValues.products = {
    data: defaultValues.products.map((product) => {
      // Convert 19.89€ to 1989. We save prices as integers in DB
      product.minPrice = intToString(product.minPrice);
      product.maxPrice = intToString(product.maxPrice);
      // Convert amounts to numbers
      product.leadTime = "" + product.leadTime;
      product.capacity = "" + product.capacity;
      product.minOrderAmount = "" + product.minOrderAmount;

      // Get file names from file object structure
      filesFields.forEach((filesField) => (product[filesField] = ""));
      product.files.forEach((element) => {
        const { fileKind, url, id } = element.file;
        product[fileKind] = url;
        product[`${fileKind}-id`] = id;
      });

      return product;
    }),
  };

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
  const { supplierId, email } = router.query;
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
      <SuccessMessage
        title="Thanks!"
        buttonTitle="Back to suppliers"
        onClickPath="/suppliers"
      >
        You have successfuly submitted updated listing to need-mask.com. Our
        moderators will now review your submission and notify you via email.
      </SuccessMessage>
    );
  }
  return (
    <>
      <SiteHero
        title="Edit your listing"
        description="Change your listing below. Our moderators will review your changes in the next 48 houres. Your listing will be offline for the meantime."
      />
      <SupplierForm
        error={errors}
        mutateSupplier={mutateSupplierFn}
        productTypes={productTypes}
        defaultValues={defaultValues}
      />
    </>
  );
};

const Edit: Props = (props) => {
  const [_, setAccessToken, { isCsr }] = useLocalStorage("accessToken", {});

  const router = useRouter();
  const { supplierId, email } = router.query;
  const { productTypes } = props;

  const [data, isLoading, errors] = useQuery(
    GET_FULL_SUPPLIER_WITH_PRODUCTS("" + supplierId),
    { auth: true }
  );

  // If no jwt is found in local storage, or request to fetch supplier data fails,
  // redirect to login page
  useEffect(() => {
    if (!isCsr) return;

    if (errors.length) {
      setAccessToken("");
      const params = queryString.stringify({ supplierId, email });
      router.push(`/auth/login?${params}`);
    }
  }, [isCsr, errors]);

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

export const listingInitialProps = async function (ctx: NextPageContext) {
  const { query } = ctx;
  const { supplierId } = query;

  if (!supplierId) {
    redirect(ctx, "/suppliers");
    return;
  }

  const { data: productTypeData } = await graphQuery(GET_PRODUCT_TYPES);

  return {
    productTypes: productTypeData.productTypes,
  };
};

Edit.getInitialProps = listingInitialProps;

export default Edit;
