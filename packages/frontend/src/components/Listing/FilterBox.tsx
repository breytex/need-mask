import React, { useState, useCallback, useEffect } from "react";
import { Flex, Text, Select, Checkbox, CheckboxGroup } from "@chakra-ui/core";
import { useMediaQuery } from "../../chakra/useMediaQuery";
import { Continent } from "../../types/Geographic";
import { ProductType } from "../../types/Product";
import { useRouter } from "next/router";
import { useCsr } from "../../hooks/useCsr";
import Headline from "../chakra/Headline";

interface Props {
  onFilterChanged: (params) => void;
  productTypes: ProductType[];
}
const Title = ({ children, ...rest }) => (
  <Text fontSize="lg" {...rest}>
    {children}
  </Text>
);
export const FilterBox = (props: Props) => {
  const router = useRouter();
  const isCheckboxInline = useMediaQuery([true, false]);

  // defer rendering of checkboxes to CSR, because of SSR glitches with `isInline`
  const isCsr = useCsr();

  const { productTypes, onFilterChanged } = props;

  const onContinentChanged = useCallback(
    (event) => {
      onFilterChanged({ page: 1, continent: event.target.value });
    },
    [onFilterChanged]
  );

  const onProductChanged = useCallback(
    (value) => {
      onFilterChanged({
        page: 1,
        products: value.length > 0 ? value.join(",") : undefined,
      });
    },
    [onFilterChanged]
  );

  const { continent, products } = router.query;
  return (
    <Flex direction="column">
      <Headline mb="2" size="md">
        What products should the supplier provide?
      </Headline>
      {isCsr && (
        <CheckboxGroup
          size="lg"
          variantColor="blue"
          defaultValue={products ? ("" + products).split(",") : []}
          onChange={onProductChanged}
          isInline={isCheckboxInline}
          ml="1"
          mt="3"
        >
          {productTypes.map((type) => (
            <Checkbox
              mr={{ base: "2", md: "0" }}
              value={type.title}
              key={type.id}
            >
              {type.title}
            </Checkbox>
          ))}
        </CheckboxGroup>
      )}
      <Headline mt="8" mb="2" size="md">
        Where should the supplier be located?
      </Headline>
      <Select
        placeholder="All continents"
        defaultValue={continent || ""}
        onChange={onContinentChanged}
        maxW="350px"
        size="lg"
      >
        {Object.entries(Continent).map(([key, value]) => (
          <option value={value} key={key}>
            {value}
          </option>
        ))}
      </Select>
    </Flex>
  );
};
