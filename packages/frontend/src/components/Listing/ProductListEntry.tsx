import React, { ReactElement } from "react";
import { Product } from "../../types/Product";
import { Flex, Text, Icon } from "@chakra-ui/core";

export default function ProductListEntry(product: Product): ReactElement {
  const minPrice = product.minPrice / 1000;
  return (
    <Flex>
      <Text w="150px" textAlign="right">
        {product.title}
      </Text>
      <Text ml="3" w="50px">
        <Icon name="euro" size="15px" color="gray.700" /> {minPrice.toFixed(2)}
      </Text>
      <Text ml="3" w="100px">
        <Icon name="shipping" color="gray.700" /> {product.leadTime} days
      </Text>
    </Flex>
  );
}
