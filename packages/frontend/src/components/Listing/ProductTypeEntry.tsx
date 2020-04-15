import React, { ReactElement, useMemo } from "react";
import { Product } from "../../types/Product";
import { Flex, Text, Icon } from "@chakra-ui/core";

export default function ProductTypeEntry(props: {
  products: Product[];
  catname: string;
}): ReactElement {
  const { products, catname } = props;

  const reduceMin = (prevValue, currentValue) =>
    Math.min(prevValue, currentValue);
  const reduceMax = (prevValue, currentValue) =>
    Math.max(prevValue, currentValue);
  const reduceAdd = (prevValue, currentValue) => prevValue + currentValue;

  const details = useMemo(() => {
    const result = {
      minPrice: 0,
      maxPrice: 0,
      minLeadTime: 0,
      maxLeadTime: 0,
      capacity: 0,
    };

    result.minPrice =
      products.map((p) => p.minPrice).reduce(reduceMin, 999) / 100;
    result.maxPrice =
      products.map((p) => p.maxPrice).reduce(reduceMax, 0) / 100;
    result.minLeadTime = products.map((p) => p.leadTime).reduce(reduceMin, 999);
    result.maxLeadTime = products.map((p) => p.leadTime).reduce(reduceMax, 0);
    result.capacity = products.map((p) => p.capacity).reduce(reduceAdd, 0);

    return result;
  }, [products]);

  return (
    <Flex justify="flex-end">
      <Text fontSize="sm" fontWeight="500" w="90px">
        {catname} ({products.length})
      </Text>
      <Text ml="4" fontSize="sm" w="100px">
        {/* <Icon name="euro" size="15px" color="gray.700" /> */}
        {details.minPrice.toFixed(2)}€ - {details.maxPrice.toFixed(2)}€
      </Text>
      <Text ml="3" fontSize="sm" w="80px">
        {details.minLeadTime} - {details.maxLeadTime} days
      </Text>
      <Text ml="3" fontSize="sm" w="100px">
        {details.capacity}
      </Text>
    </Flex>
  );
}
