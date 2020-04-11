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
import {
  CompanyAddress,
  ADRESS_BLOCKER_FIELD_NAME,
} from "../../components/supplier-register/CompanyAddress";
import {
  ProductConfigurator,
  PRODUCT_FORM_FIELD_NAME,
} from "../../components/supplier-register/ProductConfigurator";

type Props = NextPage<ProductTypeResponse>;

const Register: Props = (props) => {
  const { productTypes } = props;
  const { handleSubmit, errors, register, setValue, watch } = useForm();

  useEffect(() => {
    // register({ name: ADRESS_BLOCKER_FIELD_NAME }, { required: true });
    register({ name: PRODUCT_FORM_FIELD_NAME }, { required: true });
  }, []);

  const onSubmit = (data) => {
    console.log({ data });
  };

  return (
    <Box shadow="sm" bg="white" p="6" maxW="800px" mx="auto">
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <ContactDetails errors={errors} register={register} />

          <CompanyAddress
            errors={errors}
            register={register}
            setValue={setValue}
          /> */}

          <ProductConfigurator
            errors={errors}
            register={register}
            setValue={setValue}
            productTypes={productTypes}
            watch={watch}
          />

          <Box>
            <Button type="submit" mt="8">
              Send
            </Button>
          </Box>
        </form>
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
