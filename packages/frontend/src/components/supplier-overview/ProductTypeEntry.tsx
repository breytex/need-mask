import React, { ReactElement, useMemo } from "react";
import { Product } from "../../types/Product";
import { Flex, Text } from "@chakra-ui/core";
import { propertyReducer, toPrice } from "../../helpers/functions";
export default function ProductTypeEntry(props: {
  products: Product[];
  category: string;
}): ReactElement {
  const { products, category } = props;

  const reduceMin = (prevValue, currentValue) =>
    Math.min(prevValue, currentValue);
  const reduceMax = (prevValue, currentValue) =>
    Math.max(prevValue, currentValue);
  const reduceAdd = (prevValue, currentValue) => prevValue + currentValue;

  const details = useMemo(() => {
    const productReducer = propertyReducer(products);
    const minPrice = productReducer("minPrice", reduceMin);
    const maxPrice = productReducer("maxPrice", reduceMax);
    const minLeadTime = productReducer("leadTime", reduceMin);
    const maxLeadTime = productReducer("leadTime", reduceMax);
    const totalCapacity = productReducer("capacity", reduceAdd);
    const priceRange =
      minPrice === maxPrice
        ? `${toPrice(minPrice)}`
        : `${toPrice(minPrice)} - ${toPrice(maxPrice)}`;
    const deliveryTimeRange =
      minLeadTime === maxLeadTime
        ? `${minLeadTime} days`
        : `${minLeadTime} - ${maxLeadTime} days`;
    return {
      priceRange,
      deliveryTimeRange,
      totalCapacity,
    };
  }, [products]);

  return (
    <Flex
      justify={{ base: "flex-start", md: "flex-end" }}
      className="ProductTypeEntry"
    >
      <Text fontSize="sm" fontWeight="600" w="120px">
        {category} ({products.length})
      </Text>
      <Text ml="4" fontSize="sm" w="120px">
        {/* <Icon name="euro" size="15px" color="gray.700" /> */}
        {details.priceRange}
      </Text>
      <Text className="hideWhenTooSmall" ml="4" fontSize="sm" w="120px">
        {details.deliveryTimeRange}
      </Text>
      <Text ml="4" fontSize="sm" w="120px">
        {new Intl.NumberFormat("en-US").format(details.totalCapacity)}
      </Text>
    </Flex>
  );
}
