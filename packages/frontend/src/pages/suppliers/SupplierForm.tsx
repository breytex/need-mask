import React from "react";
import { Button, Box } from "@chakra-ui/core";
import { ErrorMessage } from "../../components/chakra/ErrorMessage";
import Form from "../../components/chakra/form/Form";
import { Section } from "../../components/chakra/form/Section";
import { ContactDetails } from "../../components/supplier-register/ContactDetails";
import { CompanyAddress } from "../../components/supplier-register/CompanyAddress";
import { ProductConfigurator } from "../../components/supplier-register/ProductConfigurator";

interface Props {
  onSubmit: (data) => void;
  productTypes: any;
  error: any;
  defaultValues?: object;
}

const SupplierForm = (props: Props) => {
  const { onSubmit, productTypes, error, defaultValues } = props;
  return (
    <Box maxW="800px" mx="auto">
      <Box>
        <ErrorMessage show={!!error} title="Oh no!">
          An error happened
        </ErrorMessage>
        <Form onSubmit={onSubmit} defaultValues={defaultValues}>
          <Section title="Contact details">
            <ContactDetails />
          </Section>
          <Section title="Company address">
            <CompanyAddress skipAlgolia={!!defaultValues} />
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
  );
};

export default SupplierForm;
