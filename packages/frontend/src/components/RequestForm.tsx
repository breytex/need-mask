import * as React from "react";
import Form from "./chakra/form/Form";
import { Box, Button, Flex, Text } from "@chakra-ui/core";
import { Product } from "../types/Product";
import { ADD_REQUEST } from "../graphql/mutations/addRequest";
import SuccessMessage from "./chakra/SuccessMessage";
import { Spinner } from "./chakra/Spinner";
import RequestedProduct from "./request-form/RequestedProduct";
import ContactDetails from "./request-form/ContactDetails";
import ContactAddress from "./request-form/ContactAddress";
import { useMutation } from "../hooks/useMutation";
import { StickyContainer, Sticky } from "react-sticky";
import { useMediaQuery } from "../chakra/useMediaQuery";
type Props = {
  supplerId: string;
  withAddress?: boolean;
  products: Product[];
  supplierCompanyName: string;
};

const SubmitButton = ({ isLoading, children, d }) => (
  <Button
    type="submit"
    isFullWidth
    variantColor="blue"
    size="lg"
    mt="6"
    isLoading={isLoading}
    d={d}
  >
    {children}
  </Button>
);

const RequestForm: React.FC<Props> = ({
  supplerId,
  withAddress,
  products,
  supplierCompanyName,
}) => {
  const { trigger: mutateRequest, data, isLoading } = useMutation<any>(
    ADD_REQUEST
  );
  const shouldStick = useMediaQuery([false, true]);

  function onSubmit(d) {
    const { requestedProducts, ...fields } = d;
    delete fields.privacy;
    delete fields.terms;
    mutateRequest({
      data: {
        ...fields,
        products: {
          data: requestedProducts.data.filter(Boolean).map((product) => ({
            productId: product.productId,
            amount: parseInt(product.amount),
          })),
        },
      },
    });
  }

  if (data) {
    return (
      <SuccessMessage
        title="Thanks!"
        buttonTitle="Back to suppliers"
        onClickPath="/suppliers"
      >
        You have successfully submitted your request to need-mask.com.
      </SuccessMessage>
    );
  }

  return (
    <Form onSubmit={onSubmit}>
      <StickyContainer>
        <Flex flexDirection={{ base: "column-reverse", md: "row" }}>
          <Box w={{ base: "100%", md: "38%" }}>
            <Text
              fontSize="25px"
              fontWeight="400"
              mb={{ base: "4", md: "6" }}
              mt="4"
            >
              Select the products you need
            </Text>
            {products.map((product, index) => (
              <RequestedProduct
                key={product.id}
                index={index}
                product={product}
              />
            ))}
            <SubmitButton
              isLoading={isLoading}
              d={{ base: "block", md: "none" }}
            >
              Submit your request
            </SubmitButton>
          </Box>

          <Box
            ml={{ base: "0", md: "12" }}
            p={{ base: "3", md: "0" }}
            w={{ base: "100%", md: "58%" }}
          >
            <Sticky disableCompensation={!shouldStick}>
              {({ style }) => (
                <div
                  className="StickyContactDetails"
                  style={shouldStick ? style : {}}
                >
                  <Text
                    fontSize="25px"
                    fontWeight="400"
                    mb={{ base: "4", md: "6" }}
                    mt="4"
                  >
                    How can the supplier reach you?
                  </Text>

                  <ContactDetails
                    id={supplerId}
                    supplierCompanyName={supplierCompanyName}
                  />
                  <SubmitButton
                    isLoading={isLoading}
                    d={{ base: "none", md: "block" }}
                  >
                    Submit your request
                  </SubmitButton>
                </div>
              )}
            </Sticky>
          </Box>
        </Flex>
      </StickyContainer>
    </Form>
  );
};

export default RequestForm;
