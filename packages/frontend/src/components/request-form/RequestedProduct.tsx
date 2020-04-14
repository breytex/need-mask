import * as React from "react";
import { useState } from "react";
import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/core/dist";
import FormLabel from "@chakra-ui/core/dist/FormLabel";
import Checkbox from "@chakra-ui/core/dist/Checkbox";
import Text from "@chakra-ui/core/dist/Text";
import { Field } from "../chakra/form/Field";
import { Product } from "../../types/Product";
import { useFormContext } from "react-hook-form";
import styled from "@emotion/styled";
import MyNumberInput from "../chakra/form/NumberInput";

const InputWrapper = styled.div`
  input:disabled {
    cursor: pointer !important;
  }
`;

type Props = {
  index: number;
  product: Product;
};

const RequestedProduct: React.FC<Props> = ({ index, product }) => {
  const {
    capacity,
    productType,
    id,
    title,
    minOrderAmount,
    leadTime,
  } = product;
  const name = `requestedProducts.data[${index}]`;

  const [checked, setChecked] = useState(false);
  const { register } = useFormContext();
  return (
    <>
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
          <Text display="inline-block" fontSize="sm">
            ({productType.title})
          </Text>
        </div>
      </Checkbox>
      <Box
        key={id}
        bg={checked ? "white" : "#ededf0"}
        p={6}
        mb={6}
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
              min={1000}
              defaultValue={1000}
              step={1000}
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
          {capacity} Units &bull;
          {minOrderAmount === 0 ? " No Min" : " " + minOrderAmount} MOQ &bull;{" "}
          {leadTime} Days
        </Box>
      </Box>
    </>
  );
};

export default RequestedProduct;
