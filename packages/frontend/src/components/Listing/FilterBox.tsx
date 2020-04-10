import React, { useState, useCallback } from "react";
import {
  Flex,
  Box,
  Text,
  Select,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/core";
import { Location, Filters } from "../../types/Filters";
import { ProductType } from "../../types/Supplier";
import { useRouter } from "next/router";
import queryString from "query-string";

interface Props {
  onFilterChanged: (params) => void;
  productTypes: ProductType[];
}

export const FilterBox = (props: Props) => {
  const router = useRouter();
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
    <Flex direction="column">
      <Select
        placeholder="Select a region"
        defaultValue={location || ""}
        onChange={onLocationChanged}
      >
        {Object.keys(Location).map((key) => (
          <option value={key} key={key}>
            {Location[key]}
          </option>
        ))}
      </Select>
      <CheckboxGroup
        variantColor="green"
        defaultValue={products ? ("" + products).split(",") : []}
        onChange={onProductChanged}
      >
        {productTypes.map((type) => (
          <Checkbox value={type.title} key={type.id}>
            {type.title}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </Flex>
  );
};
