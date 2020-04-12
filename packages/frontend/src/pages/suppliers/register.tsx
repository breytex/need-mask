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
import SiteHero from "../../components/SiteHero";

type Props = NextPage<ProductTypeResponse>;

const Register: Props = (props) => {
  const { productTypes } = props;

  const onSubmit = (data) => {
    console.log({ data });
  };

  return (
    <>
      <SiteHero
        title="Register as a Supplier"
        description="Be part of our supplier base. In case you match a request, your contact data will be shared with the potential client."
      />
      <Box maxW="800px" mx="auto">
        <Box>
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
