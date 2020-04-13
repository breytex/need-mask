import React, { useRef } from "react";
import { Button, Box, Text } from "@chakra-ui/core";
import { ErrorMessage } from "../../components/chakra/ErrorMessage";
import Form from "../../components/chakra/form/Form";
import { Section } from "../../components/chakra/form/Section";
import { ContactDetails } from "../../components/supplier-register/ContactDetails";
import { CompanyAddress } from "../../components/supplier-register/CompanyAddress";
import { ProductConfigurator } from "../../components/supplier-register/ProductConfigurator";
import { Spinner } from "../../components/chakra/Spinner";
import { cloneDeepWith } from "lodash";
import { countries } from "../../types/countries";
import { stringToInt } from "../../helpers/price";

interface Props {
  mutateSupplier: any;
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

export const filesFields = ["productImage", "packageImage", "certificateFile"];

const addImageFile = (product, fieldName, array) => {
  if (product[fieldName]) {
    if (product[`${fieldName}-id`] && product[`${fieldName}-id`] !== "") {
      array.push({ fileId: product[`${fieldName}-id`] });
    } else {
      array.push({
        file: {
          data: {
            url: product[fieldName],
            fileType: product[fieldName].split(".").slice(-1)[0],
          },
        },
      });
    }
  }
};

const onSubmit = (mutateSupplier) => (values) => {
  // Normalize data to match schema
  const data = cloneDeepWith(values);

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

    // Adding files with correct data structure
    if (filesFields.some((filesField) => product[filesField] !== "")) {
      product.files = {
        data: [],
      };
      filesFields.forEach((fileField) =>
        addImageFile(product, fileField, product.files.data)
      );
    }

    // Remove file fields
    filesFields.forEach((filesField) => delete product[filesField]);
    filesFields.forEach((filesField) => delete product[`${filesField}-id`]);

    return product;
  });

  delete data.productTypes;
  delete data.addressBlocker;
  delete data.id;
  mutateSupplier({ data });
};

const SupplierForm = (props: Props) => {
  const {
    productTypes,
    error,
    defaultValues,
    isLoading,
    mutateSupplier,
  } = props;
  const errorBoxRef = useRef();

  const onSubmitFn = (data) => {
    scrollToRef(errorBoxRef);
    onSubmit(mutateSupplier)(data);
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
