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

type Props = NextPage<ProductTypeResponse>;

const Register: Props = (props) => {
  const { productTypes } = props;

  const onSubmit = (data) => {
    console.log({ data });
  };

  return (
    <Box shadow="sm" bg="white" p="6" maxW="800px" mx="auto">
      <Box>
        <Form onSubmit={onSubmit}>
          <ContactDetails />

          <CompanyAddress />

          <ProductConfigurator productTypes={productTypes} />

          <Box>
            <Button type="submit" mt="8">
              Send
            </Button>
          </Box>
        </Form>
      </Box>
    </Box>
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
