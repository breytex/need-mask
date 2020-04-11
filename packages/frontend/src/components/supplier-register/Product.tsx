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
import { useFormContext } from "react-hook-form";

interface Props {
  id: string;
  title: string;
  onDelete: (id) => void;
}

const Product = (props: Props) => {
  const { id, title, onDelete } = props;
  const { register, errors } = useFormContext();

  return (
    <Box mb="6" p="4" bg="white" shadow="md" mx={{ base: "-15px", md: "0" }}>
      <Box float="right">
        <Icon name="close" onClick={() => onDelete(id)} mt="-5px" />
      </Box>
      <Heading fontSize="lg">{title}</Heading>
      <FieldRow mt="3">
        <Field label="Min price" name={`${id}.minPrice`} flexGrow={1}>
          <NumberInput defaultValue={0.3} precision={2} step={0.1}>
            <NumberInputField
              type="number"
              name={`${id}.minPrice`}
              ref={register()}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Field>
        <Field label="Max price" name={`${id}.maxPrice`} flexGrow={1}>
          <NumberInput defaultValue={0.3} precision={2} step={0.1}>
            <NumberInputField
              type="number"
              name={`${id}.maxPrice`}
              ref={register()}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Field>
      </FieldRow>
      <FieldRow>
        <Field
          label="Capacity"
          hint="Amount per week"
          name={`${id}.capacity`}
          flexGrow={1}
        >
          <NumberInput defaultValue={1000} min={1000} step={1000}>
            <NumberInputField
              type="number"
              name={`${id}.capacity`}
              ref={register()}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Field>
        <Field
          label="Lead time"
          hint="Expected time to delivery in days"
          name={`${id}.leadTime`}
          flexGrow={1}
        >
          <NumberInput defaultValue={14} min={1} max={28} step={1}>
            <NumberInputField
              type="number"
              name={`${id}.leadTime`}
              ref={register()}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Field>
        <Field
          label="Minimum order amount"
          hint=" "
          name={`${id}.minOrderAmount`}
          flexGrow={1}
        >
          <NumberInput defaultValue={1000} min={1000} step={1000}>
            <NumberInputField
              type="number"
              name={`${id}.minOrderAmount`}
              ref={register()}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Field>
      </FieldRow>
      <Field name={`${id}.description`}>
        <Textarea
          name={`${id}.description`}
          placeholder="Product description"
          ref={register()}
        />
      </Field>
    </Box>
  );
};

export default Product;
