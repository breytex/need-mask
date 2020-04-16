import React, { useRef } from "react";
import { Button, Box, Text, Flex } from "@chakra-ui/core";
import { ErrorMessage } from "../../components/chakra/ErrorMessage";
import Form from "../../components/chakra/form/Form";
import { Section } from "../../components/chakra/form/Section";
import { ContactDetails } from "../../components/supplier-register/ContactDetails";
import { CompanyAddress } from "../../components/supplier-register/CompanyAddress";
import { ProductConfigurator } from "../../components/supplier-register/ProductConfigurator";
import { Spinner } from "../../components/chakra/Spinner";
import { cloneDeepWith } from "lodash";
import { countries } from "../../types/Geographic";
import { stringToInt } from "../../helpers/price";
import { Product } from "../../types/Product";
import Card from "../../components/chakra/Card";
import { StickyContainer, Sticky } from "react-sticky";
import { useMediaQuery } from "../../chakra/useMediaQuery";

interface Props {
  mutateSupplier: any;
  productTypes: any;
  errors: Array<Error>;
  defaultValues?: object;
  isLoading?: boolean;
  isEdit?: boolean;
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
            fileKind: fieldName,
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
  data.products.data = Object.entries(data.products.data).map(
    ([_, product]: [string, any]) => {
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
    }
  );

  delete data.productTypes;
  delete data.addressBlocker;
  delete data.id;

  mutateSupplier({ data });
};

const SupplierForm = (props: Props) => {
  const {
    productTypes,
    errors,
    defaultValues,
    isLoading,
    mutateSupplier,
    isEdit,
  } = props;
  const errorBoxRef = useRef();
  const shouldStick = useMediaQuery([false, true]);

  const onSubmitFn = (data) => {
    scrollToRef(errorBoxRef);
    onSubmit(mutateSupplier)(data);
  };
  console.log({ errors });
  return (
    <StickyContainer>
      <Box mx="auto">
        <Box>
          <a ref={errorBoxRef}></a>
          <ErrorMessage show={errors?.length > 0} title="Oh no!">
            <React.Fragment>
              An error happened
              <br />
              {Object.entries(errorMapping).map(([key, value]) => {
                // Sieht turboscheiße aus aber ist mir egal so oft kommt der Error nicht vor
                if (!Array.isArray(errors) || errors.length === 0) return null;
                if (errors.some((e) => e.message.includes(key))) {
                  return <Text>{value}</Text>;
                }
                return null;
              })}
            </React.Fragment>
          </ErrorMessage>
          <Form onSubmit={onSubmitFn} defaultValues={defaultValues}>
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              justify={{ base: "flex-start", md: "space-around" }}
            >
              <Box w={{ base: "100%", md: "48%" }} p="6">
                <Section title="Product portfolio">
                  <ProductConfigurator productTypes={productTypes} />
                </Section>
              </Box>
              <Box p="6" w={{ base: "100%", md: "48%" }}>
                <Sticky className="Sticky" disableCompensation={!shouldStick}>
                  {({ style }) => (
                    <div style={shouldStick ? style : {}}>
                      <Box minH={{ md: "930px" }}>
                        <Section title="Contact details" mb="8">
                          <ContactDetails />
                        </Section>
                        <Section title="Company address">
                          <CompanyAddress skipAlgolia={!!defaultValues} />
                        </Section>
                        <Button
                          mx="auto"
                          type="submit"
                          variantColor="blue"
                          mt={{ base: "5", md: "10" }}
                          isLoading={isLoading}
                          size="lg"
                          isFullWidth
                        >
                          {isEdit
                            ? "Submit edited listing"
                            : "Send application"}
                        </Button>
                        {isEdit && (
                          <Text color="gray.600" mt="2">
                            When you submit, your listing will be unlisted until
                            its approval (6-48h)
                          </Text>
                        )}
                      </Box>
                    </div>
                  )}
                </Sticky>
              </Box>
            </Flex>
          </Form>
        </Box>
      </Box>
    </StickyContainer>
  );
};

export default SupplierForm;
