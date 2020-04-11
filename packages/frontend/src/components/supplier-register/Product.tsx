import React, { useCallback } from "react";
import {
  Box,
  Icon,
  Heading,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/core";
import { Field } from "../chakra/form/Field";
import { FieldRow } from "../chakra/form/FieldRow";

interface Props {
  id: string;
  title: string;
  onDelete: (id) => void;
  register: (obj?) => (ref) => void;
  errors: any;
}

const Product = (props: Props) => {
  const { id, title, onDelete, register, errors } = props;
  return (
    <Box mb="6" p="4" bg="gray.50" shadow="md" mx={{ base: "-15px", md: "0" }}>
      <Box float="right">
        <Icon name="close" onClick={() => onDelete(id)} mt="-5px" />
      </Box>
      <Heading fontSize="lg">{title}</Heading>
      <FieldRow>
        <Field errors={errors} name={`${id}.minPrice`} flexGrow={1}>
          <NumberInput defaultValue={0.3} precision={2} step={0.1}>
            <NumberInputField type="number" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Field>

        <NumberInput defaultValue={0.3} precision={2} step={0.1}>
          <NumberInputField type="number" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FieldRow>
      <Field name={`${id}.description`} errors={errors}>
        <Textarea
          name={`${id}.description`}
          placeholder="Product description"
          ref={register()}
        />
      </Field>
      {id} {title}
    </Box>
  );
};

export default Product;
