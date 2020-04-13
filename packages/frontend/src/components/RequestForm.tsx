import * as React from "react";
import Form from "./chakra/form/Form";
import { Box, Button } from "@chakra-ui/core/dist";
import { Product } from "../types/Supplier";
import { useMutation } from "urql";
import { ADD_REQUEST } from "../graphql/mutations/addRequest";
import SuccessMessage from "./chakra/SuccessMessage";
import { Spinner } from "./chakra/Spinner";
import RequestedProduct from "./request-form/RequestedProduct";
import ContactDetails from "./request-form/ContactDetails";
import ContactAddress from "./request-form/ContactAddress";
import SimpleGrid from "@chakra-ui/core/dist/SimpleGrid";

type Props = {
  supplerId: string;
  withAddress?: boolean;
  products: Product[];
};

const RequestForm: React.FC<Props> = ({ supplerId, withAddress, products }) => {
  const [{ fetching, data }, mutateRequest] = useMutation(ADD_REQUEST);

  function onSubmit(d) {
    const { requestedProducts, ...fields } = d;
    mutateRequest({
      data: {
        ...fields,
        products: {
          data: requestedProducts.filter(Boolean).data.map((product) => ({
            productId: product.productId,
            amount: parseInt(product.amount),
          })),
        },
      },
    });
  }

  if (fetching) {
    return <Spinner />;
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
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Box>
          {products.map((product, index) => (
            <RequestedProduct
              key={product.id}
              index={index}
              product={product}
            />
          ))}
        </Box>
        <Box bg="white" p={4}>
          <ContactDetails id={supplerId} />
          {withAddress && <ContactAddress />}
        </Box>
      </SimpleGrid>
      <Button type="submit" isFullWidth>
        Submit your request
      </Button>
    </Form>
  );
};

export default RequestForm;
