import React, { useState } from "react";
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

interface Props {
  onFilterChanged: () => void;
  productTypes: ProductType[];
}

export const FilterBox = (props: Props) => {
  const { productTypes } = props;
  const [state, setState] = useState<Filters>({});

  const onLocationChanged = (event) => {
    const { value } = event.target;
    setState((state) => ({
      ...state,
      location: Location[value],
    }));
  };

  const onProductChanged = (value) =>
    setState((state) => ({
      ...state,
      products: value,
    }));

  return (
    <Flex direction="column">
      <Select placeholder="Select a region" onChange={onLocationChanged}>
        {Object.keys(Location).map((key) => (
          <option value={key} key={key}>
            {Location[key]}
          </option>
        ))}
      </Select>
      <CheckboxGroup variantColor="green" onChange={onProductChanged}>
        {productTypes.map((type) => (
          <Checkbox value={type.id} key={type.id}>
            {type.title}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </Flex>
  );
};
