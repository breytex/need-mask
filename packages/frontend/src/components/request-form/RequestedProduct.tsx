import * as React from "react";
import { useState } from "react";
import { Box, Flex } from "@chakra-ui/core/dist";
import FormLabel from "@chakra-ui/core/dist/FormLabel";
import Checkbox from "@chakra-ui/core/dist/Checkbox";
import Text from "@chakra-ui/core/dist/Text";
import { Field } from "../chakra/form/Field";
import { Product } from "../../types/Product";
import { useFormContext } from "react-hook-form";
import styled from "@emotion/styled";
import MyNumberInput from "../chakra/form/NumberInput";
import { toPrice } from "../../helpers/functions";
import Card from "../../components/chakra/Card";

const InputWrapper = styled.div`
  input:disabled {
    cursor: pointer !important;
  }
`;

type Props = {
  index: number;
  product: Product;
};
const KeyValue = (props) => {
  const { label, value, available } = props;
  return (
    <Flex
      fontWeight="semibold"
      letterSpacing="wide"
      fontSize="xs"
      textTransform="uppercase"
    >
      <Text color="gray.700" w="140px">
        {label}:
      </Text>
      <Text color="gray.800">{available ? value : "N/A"}</Text>
    </Flex>
  );
};

const RequestedProduct: React.FC<Props> = ({ index, product }) => {
  const {
    capacity,
    productType,
    id,
    title,
    minOrderAmount,
    leadTime,
    minPrice,
    maxPrice,
  } = product;
  const name = `requestedProducts.data[${index}]`;

  const [checked, setChecked] = useState(false);
  const { register } = useFormContext();
  const priceRange =
    minPrice === maxPrice
      ? `${toPrice(minPrice)}`
      : `${toPrice(minPrice)} - ${toPrice(maxPrice)}`;

  return (
    <Card bg={checked ? "white" : "gray.50"} p={4} mb={6}>
      <FormLabel display="block">
        <Checkbox
          size="lg"
          mb="2"
          isChecked={checked}
          onChange={() => {
            setChecked(!checked);
          }}
        >
          <div style={{ visibility: "visible" }}>
            {title}{" "}
            <Text display="inline-block" color="gray.700" fontSize="sm" ml="2">
              ({productType.title})
            </Text>
          </div>
        </Checkbox>
      </FormLabel>
      <Box
        key={id}
        px={{ base: 2, md: 6 }}
        pb={4}
        onClick={() => {
          setChecked(true);
        }}
        cursor={checked ? "initial" : "pointer"}
      >
        <input
          type="hidden"
          name={`${name}.productId`}
          value={id}
          ref={register({ required: true })}
        />
        <Field key={id} name={id}>
          <InputWrapper>
            <MyNumberInput
              name={`${name}.amount`}
              min={minOrderAmount || 1000}
              defaultValue={minOrderAmount || 1000}
              step={1000}
              isDisabled={!checked}
            />
          </InputWrapper>
        </Field>

        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          <KeyValue
            label="Price range"
            value={priceRange}
            available={priceRange !== toPrice(0)}
          />
          <KeyValue
            label="Delivery time"
            value={`${leadTime} days`}
            available={Boolean(leadTime)}
          />
          <KeyValue
            label="Capacity"
            value={`${capacity} units/week`}
            available={Boolean(capacity)}
          />
          <KeyValue
            label="Min amount"
            value={`${minOrderAmount} units`}
            available={Boolean(minOrderAmount)}
          />
          {/* {capacity} Units available &bull;
          {minOrderAmount === 0 ? " No Min" : " " + minOrderAmount} MOQ &bull;{" "}
          {leadTime} Days */}
        </Box>
      </Box>
    </Card>
  );
};

export default RequestedProduct;
