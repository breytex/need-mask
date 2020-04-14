import React, { useEffect, useMemo, useCallback } from "react";
import { ProductType } from "../../types/Product";
import { Icon, Flex, Select, Box, Text } from "@chakra-ui/core";
import Product from "./Product";
import { useFormContext } from "react-hook-form";
import Error from "../chakra/form/Error";
interface Props {
  productTypes: ProductType[];
}

export const PRODUCT_FORM_FIELD_NAME = "productTypes";

export const ProductConfigurator = (props: Props) => {
  const { productTypes = [] } = props;
  const { register, errors, setValue, watch } = useFormContext();

  useEffect(() => {
    register({ name: PRODUCT_FORM_FIELD_NAME }, { required: true });
  }, []);

  const rawValue = watch(PRODUCT_FORM_FIELD_NAME) || "";

  const selectedProducts = useMemo(
    () => (rawValue === "" ? [] : rawValue.split(",")),
    [rawValue]
  );

  const onProductSelected = (event) => {
    const id = event.target.value;

    if (!productTypes.some((productType) => productType.id === id)) return;
    const newValue = [...selectedProducts, id].join(",");
    setValue(PRODUCT_FORM_FIELD_NAME, newValue);
  };

  const onDelete = useCallback(
    (id) => {
      const input = confirm(
        "Do you really want to delete this product from your portfolio?"
      );
      if (!input) return;
      setValue(
        PRODUCT_FORM_FIELD_NAME,
        [...selectedProducts.filter((productId) => productId !== id)].join(",")
      );
    },
    [selectedProducts]
  );

  const addWording = selectedProducts.length === 0 ? "the first" : "another";
  return (
    <React.Fragment>
      {selectedProducts.map((productId, index) => (
        <Product
          onDelete={onDelete}
          key={`product-${productId}-${index}`}
          index={index}
          {...productTypes.find((product) => product.id === productId)}
        />
      ))}

      <Flex mb="12" flexDirection="column" alignItems="center">
        <Flex alignItems="center">
          <Icon name="add" size="20px" />
          <Text ml="4" fontSize="xl">
            Add {addWording} product to your portfolio
          </Text>
        </Flex>
        <Box maxW="500px">
          <Select
            mt="3"
            size="lg"
            w="300px"
            onChange={onProductSelected}
            value={""}
            name="productTypeSelect"
            placeholder="Choose a product type to add..."
          >
            {productTypes.map((type) => (
              <option value={type.id} key={type.id}>
                {type.title}
              </option>
            ))}
          </Select>
          {errors[PRODUCT_FORM_FIELD_NAME] && (
            <Error>Please add at least one product.</Error>
          )}
        </Box>
      </Flex>
    </React.Fragment>
  );
};
