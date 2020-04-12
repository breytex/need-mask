import React from "react";
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

type Props = NextPage<ProductTypeResponse>;

const Register: Props = (props) => {
  const [{ fetching, error, data }, mutateSupplier] = useMutation(ADD_SUPPLIER);
  const { productTypes } = props;

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
        error={error}
        onSubmit={onSubmit}
        productTypes={productTypes}
      />
    </>
  );
};

export const listingInitialProps = async function (ctx: NextUrqlPageContext) {
  const { urqlClient } = ctx;

  const { data: productTypeData } = await urqlClient
    .query(GET_PRODUCT_TYPES)
    .toPromise();

  return {
    productTypes: productTypeData.productTypes,
  };
};

Register.getInitialProps = listingInitialProps;

export default withUrqlClient(urqlConfig)(Register);
