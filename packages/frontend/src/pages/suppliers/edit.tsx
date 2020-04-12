import React, { useEffect } from "react";
import { NextPage } from "next";

import { NextUrqlPageContext, withUrqlClient } from "next-urql";
import {
  GET_PRODUCT_TYPES,
  ProductTypeResponse,
} from "../../graphql/queries/products";
import { urqlConfig } from "../../graphql/urqlConfig";

import { useMutation } from "urql";
import { ADD_SUPPLIER } from "../../graphql/mutations/addSupplier";
import { Spinner } from "../../components/chakra/Spinner";
import { cloneDeepWith } from "lodash";
import { countries } from "../../types/countries";
import { stringToInt } from "../../helpers/price";

import SuccessMessage from "../../components/chakra/SuccessMessage";
import SiteHero from "../../components/SiteHero";
import SupplierForm from "./SupplierForm";
import { useRouter } from "next/router";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { GET_SUPPLIER_FN_WITH_PRODUCTS } from "../../graphql/queries/supplier";
import { redirect } from "../../helpers/redirect";
import { Supplier } from "../../types/Supplier";

interface Response extends ProductTypeResponse {
  supplierData: Supplier;
}

type Props = NextPage<Response>;

const Register: Props = (props) => {
  const [{ fetching, error, data }, mutateSupplier] = useMutation(ADD_SUPPLIER);
  const [accessToken, setAccessToken, { isCsr }] = useLocalStorage(
    "accessToken",
    {}
  );
  const router = useRouter();
  const { supplierId } = router.query;
  const { productTypes, supplierData } = props;
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

  const onSubmit = (values) => {
    // Normalize data to match schema
    const data = cloneDeepWith(values);
    // console.log({ data });

    // Combine street and number
    data.street = `${data.street} ${data.number}`;
    delete data.number;

    // Resolve continent name
    data.continent = countries.filter(
      (c) => c.code === data.country
    )[0].continent;

    // Iterate all product types
    data.products.data = data.products.data.map((product) => {
      // Convert 19.89€ to 1989. We save prices as integers in DB
      product.minPrice = stringToInt(product.minPrice);
      product.maxPrice = stringToInt(product.maxPrice);

      // Convert amounts to numbers
      product.leadTime = parseInt(product.leadTime);
      product.capacity = parseInt(product.capacity);
      product.minOrderAmount = parseInt(product.minOrderAmount);

      return product;
    });

    delete data.productTypes;
    delete data.addressBlocker;
    mutateSupplier({ data });
  };

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
        onSubmit={onSubmit}
        productTypes={productTypes}
        defaultValues={supplierData}
      />
    </>
  );
};

export const listingInitialProps = async function (ctx: NextUrqlPageContext) {
  const { urqlClient, query } = ctx;
  const { supplierId } = query;

  if (!supplierId) {
    console.log("supplier id not set");
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

Register.getInitialProps = listingInitialProps;

export default withUrqlClient(urqlConfig)(Register);
