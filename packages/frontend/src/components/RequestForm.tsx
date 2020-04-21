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
import { BorderHeadline } from "./chakra/BorderHeadline";
type Props = {
  supplerId: string;
  withAddress?: boolean;
  products: Product[];
  supplierCompanyName: string;
};

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
        <Flex flexDirection={{ base: "column", md: "row" }}>
          <Box w={{ base: "100%", md: "38%" }}>
            <BorderHeadline>Select the products you need</BorderHeadline>
            {products.map((product, index) => (
              <RequestedProduct
                key={product.id}
                index={index}
                product={product}
              />
            ))}
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
                  <BorderHeadline>
                    How can the supplier reach you?
                  </BorderHeadline>

                  <ContactDetails
                    id={supplerId}
                    supplierCompanyName={supplierCompanyName}
                  />
                  <Button
                    type="submit"
                    isFullWidth
                    variantColor="blue"
                    size="lg"
                    mt="6"
                    isLoading={isLoading}
                  >
                    Submit your request
                  </Button>
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
