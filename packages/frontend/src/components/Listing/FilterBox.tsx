import React, { useState, useCallback, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Select,
  Checkbox,
  CheckboxGroup,
  Heading,
} from "@chakra-ui/core";
import { useMediaQuery } from "../../chakra/useMediaQuery";
import { Location } from "../../types/Filters";
import { ProductType } from "../../types/Supplier";
import { useRouter } from "next/router";
import { useCsr } from "../../hooks/useCsr";

interface Props {
  onFilterChanged: (params) => void;
  productTypes: ProductType[];
}

export const FilterBox = (props: Props) => {
  const router = useRouter();
  const isCheckboxInline = useMediaQuery([true, false]);
  const headingSize = useMediaQuery(["sm", "md"]);

  // defer rendering of checkboxes to CSR, because of SSR glitches with `isInline`
  const isCsr = useCsr();

  const { productTypes, onFilterChanged } = props;

  const onLocationChanged = useCallback(
    (event) => {
      onFilterChanged({ page: 1, location: event.target.value });
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

  const { location, products } = router.query;
  return (
    <Flex direction="column" bg={"white"} p="4" shadow="sm">
      <Heading size={headingSize} mb={{ base: "2", md: "3", lg: "3" }}>
        Filters
      </Heading>
      <Select
        placeholder="Select a region"
        defaultValue={location || ""}
        onChange={onLocationChanged}
        maxW="350px"
        size="lg"
      >
        {Object.keys(Location).map((key) => (
          <option value={key} key={key}>
            {Location[key]}
          </option>
        ))}
      </Select>
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
            <Checkbox value={type.title} key={type.id}>
              {type.title}
            </Checkbox>
          ))}
        </CheckboxGroup>
      )}
    </Flex>
  );
};
