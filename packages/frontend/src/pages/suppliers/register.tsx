import React, { useEffect } from "react";
import { NextPage } from "next";
import { Button, Box } from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { NextUrqlPageContext, withUrqlClient } from "next-urql";
import {
  GET_PRODUCT_TYPES,
  ProductTypeResponse,
} from "../../graphql/queries/products";
import { urqlConfig } from "../../graphql/urqlConfig";
import { ContactDetails } from "../../components/supplier-register/ContactDetails";
import { CompanyAddress } from "../../components/supplier-register/CompanyAddress";
import { ProductConfigurator } from "../../components/supplier-register/ProductConfigurator";
import Form from "../../components/chakra/form/Form";
import { Section } from "../../components/chakra/form/Section";
import { useMutation } from "urql";
import { ADD_SUPPLIER } from "../../graphql/mutations/addSupplier";
import { Spinner } from "../../components/chakra/Spinner";
import { cloneDeepWith } from "lodash";
import { countries } from "../../types/countries";
import { stringToInt } from "../../helpers/price";
import { ErrorMessage } from "../../components/chakra/ErrorMessage";
import SuccessMessage from "../../components/chakra/SuccessMessage";
import SiteHero from "../../components/SiteHero";

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
    return <Spinner></Spinner>;
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
      <Box maxW="800px" mx="auto">
        <Box>
          <ErrorMessage show={!!error} title="Oh no!">
            An error happened
          </ErrorMessage>
          <Form onSubmit={onSubmit}>
            <Section title="Contact details">
              <ContactDetails />
            </Section>
            <Section title="Company address">
              <CompanyAddress />
            </Section>
            <Section title="Product portfolio">
              <ProductConfigurator productTypes={productTypes} />
            </Section>
            <Button type="submit" variantColor="blue" mt="8">
              Send application
            </Button>
          </Form>
        </Box>
      </Box>
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
