import React from "react";
import { Text } from "@chakra-ui/core";

interface Props {
  mt?: string;
}

export const DetailsWarning = ({ mt = "5" }: Props) => {
  return (
    <Text mt={mt} maxW="650px" color="gray.700">
      All details such as availability, capacity, price range and lead time of
      the presented products are not binding and are up to further negotiation
      between you and the supplier. Need-mask.com is only a mediator of contact
      details, not a supplier of goods.
    </Text>
  );
};
