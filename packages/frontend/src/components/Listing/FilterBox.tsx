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
import { useRouter } from "next/router";
import queryString from "query-string";

interface Props {
  onFilterChanged: () => void;
  productTypes: ProductType[];
}

export const FilterBox = (props: Props) => {
  const router = useRouter();
  const { page, ...filterParams } = router.query;
  const { productTypes } = props;
  const [state, setState] = useState<Filters>({});

  const toNewFilterUrl = (newFilterParams) => {
    const paramString = queryString.stringify(newFilterParams);
    const newUrl = `/listings/[page]${paramString ? "?" + paramString : ""}`;
    router.push(newUrl, newUrl.replace("[page]", "" + page));
  };

  const onLocationChanged = (event) => {
    const { value } = event.target;
    setState((state) => ({
      ...state,
      location: Location[value],
    }));
  };

  const onProductChanged = (value) => {
    console.log({ value });
    toNewFilterUrl({ ...filterParams, products: value.join(",") });
  };

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
          <Checkbox value={type.title} key={type.id}>
            {type.title}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </Flex>
  );
};
