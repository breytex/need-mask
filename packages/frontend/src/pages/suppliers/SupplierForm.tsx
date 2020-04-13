import React, { useRef } from "react";
import { Button, Box, Text } from "@chakra-ui/core";
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
  isLoading?: boolean;
}

const errorMapping = {
  supplier_email_key1:
    "This email address has already been used for another listing. Please login to change your listing instead of creating a new one!",
};

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 300);

const SupplierForm = (props: Props) => {
  const { onSubmit, productTypes, error, defaultValues, isLoading } = props;
  const errorBoxRef = useRef();

  const onSubmitFn = (data) => {
    scrollToRef(errorBoxRef);
    onSubmit(data);
  };

  return (
    <Box maxW="800px" mx="auto">
      <Box>
        <a ref={errorBoxRef}></a>
        <ErrorMessage show={!!error} title="Oh no!">
          <React.Fragment>
            An error happened
            <br />
            {Object.entries(errorMapping).map(([key, value]) => {
              if (!error || !error.message) return null;
              if (error.message.includes(key)) {
                return <Text>{value}</Text>;
              }
              return null;
            })}
          </React.Fragment>
        </ErrorMessage>
        <Form onSubmit={onSubmitFn} defaultValues={defaultValues}>
          <Section title="Contact details">
            <ContactDetails />
          </Section>
          <Section title="Company address">
            <CompanyAddress skipAlgolia={!!defaultValues} />
          </Section>
          <Section title="Product portfolio">
            <ProductConfigurator productTypes={productTypes} />
          </Section>
          <Button
            type="submit"
            variantColor="blue"
            mt="8"
            isLoading={isLoading}
          >
            Send application
          </Button>
        </Form>
      </Box>
    </Box>
  );
};

export default SupplierForm;
