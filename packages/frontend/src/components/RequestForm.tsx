import * as React from "react";
import Form from "./chakra/form/Form";
import { Box, Button, Flex } from "@chakra-ui/core/dist";
import { Product } from "../types/Product";
import { ADD_REQUEST } from "../graphql/mutations/addRequest";
import SuccessMessage from "./chakra/SuccessMessage";
import { Spinner } from "./chakra/Spinner";
import RequestedProduct from "./request-form/RequestedProduct";
import ContactDetails from "./request-form/ContactDetails";
import ContactAddress from "./request-form/ContactAddress";
import { useMutation } from "../hooks/useMutation";

type Props = {
  supplerId: string;
  withAddress?: boolean;
  products: Product[];
};

const RequestForm: React.FC<Props> = ({ supplerId, withAddress, products }) => {
  const { trigger: mutateRequest, data, isLoading } = useMutation<any>(
    ADD_REQUEST
  );

  function onSubmit(d) {
    const { requestedProducts, ...fields } = d;
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
      <Flex>
        <Box flexGrow={1}>
          {products.map((product, index) => (
            <RequestedProduct
              key={product.id}
              index={index}
              product={product}
            />
          ))}
        </Box>

        <Box ml={{ base: "0", md: "6" }} bg="white" p={6} flexGrow={2}>
          <ContactDetails id={supplerId} />
          {withAddress && <ContactAddress />}
          <Button
            type="submit"
            isFullWidth
            variantColor="blue"
            size="lg"
            mt="4"
            isLoading={isLoading}
          >
            Submit your request
          </Button>
        </Box>
      </Flex>
    </Form>
  );
};

export default RequestForm;
