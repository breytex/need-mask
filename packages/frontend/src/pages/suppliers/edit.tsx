import React, { useEffect } from "react";
import { NextPage } from "next";

import { NextUrqlPageContext, withUrqlClient } from "next-urql";
import {
  GET_PRODUCT_TYPES,
  ProductTypeResponse,
} from "../../graphql/queries/products";
import { urqlConfig } from "../../graphql/urqlConfig";

import { useMutation } from "urql";
import { UPDATE_SUPPLIER } from "../../graphql/mutations/addSupplier";
import { Spinner } from "../../components/chakra/Spinner";
import { cloneDeepWith } from "lodash";
import { intToString } from "../../helpers/price";

import SuccessMessage from "../../components/chakra/SuccessMessage";
import SiteHero from "../../components/SiteHero";
import SupplierForm from "./SupplierForm";
import { useRouter } from "next/router";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { GET_SUPPLIER_FN_WITH_PRODUCTS } from "../../graphql/queries/supplier";
import { redirect } from "../../helpers/redirect";
import { Supplier } from "../../types/Supplier";
import { PRODUCT_FORM_FIELD_NAME } from "../../components/supplier-register/ProductConfigurator";
interface Response extends ProductTypeResponse {
  supplierData: Supplier;
}

type Props = NextPage<Response>;

const filesFields = ["productImage", "packageImage", "certificateFile"];

const transformSupplierDataToFormState = (supplierData) => {
  const defaultValues = cloneDeepWith(supplierData);
  console.log({ supplierData });

  defaultValues[PRODUCT_FORM_FIELD_NAME] = supplierData.products
    .map((product) => product.id)
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
        const { fileKind, url } = element.file;
        product[fileKind] = url;
      });

      return product;
    }),
  };

  console.log({ defaultValues });
  return defaultValues;
};

const Edit: Props = (props) => {
  const [{ fetching, error, data }, mutateSupplier] = useMutation(
    UPDATE_SUPPLIER
  );
  const [accessToken, setAccessToken, { isCsr }] = useLocalStorage(
    "accessToken",
    {}
  );
  const router = useRouter();
  const { supplierId } = router.query;
  const { productTypes, supplierData } = props;

  const defaultValues = transformSupplierDataToFormState(supplierData);

  const mutateSupplierFn = ({ data }) => {
    mutateSupplier({ data, id: supplierId });
  };

  // If no jwt is found in local storage, or its expired
  // redirect to login page
  useEffect(() => {
    if (!isCsr) return;
    const now = new Date().getTime();
    if (
      !accessToken ||
      !accessToken.jwt ||
      !accessToken.expire ||
      now > accessToken.expire
    ) {
      setAccessToken({});
      const queryParam = supplierId ? `?supplierId=${supplierId}` : "";
      // router.push(`/auth/login${queryParam}`);
    }
  }, [isCsr]);

  if (fetching) {
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
        error={error}
        mutateSupplier={mutateSupplierFn}
        productTypes={productTypes}
        defaultValues={defaultValues}
      />
    </>
  );
};

export const listingInitialProps = async function (ctx: NextUrqlPageContext) {
  const { urqlClient, query } = ctx;
  const { supplierId } = query;

  if (!supplierId) {
    redirect(ctx, "/suppliers");
    return;
  }

  const { data: productTypeData } = await urqlClient
    .query(GET_PRODUCT_TYPES)
    .toPromise();

  const { data: supplierData } = await urqlClient
    .query(GET_SUPPLIER_FN_WITH_PRODUCTS("" + supplierId))
    .toPromise();

  if (!supplierData || !supplierData.suppliers_by_pk) {
    redirect(ctx, "/suppliers");
    return;
  }

  return {
    productTypes: productTypeData.productTypes,
    supplierData: supplierData.suppliers_by_pk,
  };
};

Edit.getInitialProps = listingInitialProps;

export default withUrqlClient(urqlConfig)(Edit);
