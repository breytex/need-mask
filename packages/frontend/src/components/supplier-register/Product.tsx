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
import UploadInput from "../chakra/UploadInput";

interface Props {
  id: string;
  title: string;
  onDelete: (id) => void;
  index: number;
}

const Product = (props: Props) => {
  const { title, onDelete, index, id } = props;
  const { register } = useFormContext();
  const name = `products.data[${index}]`;
  return (
    <Box mb="6" p="4" bg="white" shadow="md" mx={{ base: "-15px", md: "0" }}>
      <Box float="right">
        <Icon name="close" onClick={() => onDelete(id)} mt="-5px" />
      </Box>
      <Heading fontSize="lg">{title}</Heading>
      <FieldRow mt="3">
        <Field
          label="Min price"
          name={`${name}.minPrice`}
          flexGrow={1}
          isRequired
        >
          <NumberInput defaultValue={0.3} precision={2} step={0.1}>
            <NumberInputField
              type="number"
              name={`${name}.minPrice`}
              ref={register()}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Field>
        <Field
          label="Max price"
          name={`${name}.maxPrice`}
          flexGrow={1}
          isRequired
        >
          <NumberInput defaultValue={0.3} precision={2} step={0.1}>
            <NumberInputField
              type="number"
              name={`${name}.maxPrice`}
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
          name={`${name}.capacity`}
          flexGrow={1}
          isRequired
        >
          <NumberInput defaultValue={1000} min={1000} step={1000}>
            <NumberInputField
              type="number"
              name={`${name}.capacity`}
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
          name={`${name}.leadTime`}
          flexGrow={1}
          isRequired
        >
          <NumberInput defaultValue={14} min={1} max={28} step={1}>
            <NumberInputField
              type="number"
              name={`${name}.leadTime`}
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
          name={`${name}.minOrderAmount`}
          flexGrow={1}
          isRequired
        >
          <NumberInput defaultValue={1000} min={1000} step={1000}>
            <NumberInputField
              type="number"
              name={`${name}.minOrderAmount`}
              ref={register()}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Field>
      </FieldRow>
      <Field name={`${name}.description`}>
        <Textarea
          name={`${name}.description`}
          placeholder="Product description"
          ref={register()}
        />
      </Field>
      <Field
        name={`${name}.productImage`}
        label="Product photo"
        hint="Max 5 MB"
        isRequired
      >
        <UploadInput
          description="Upload a photo of the product..."
          name={`${name}.productImage`}
          isRequired
        />
      </Field>
      <Field
        name={`${name}.packageImage`}
        label="Package photo"
        hint="Max 5 MB"
      >
        <UploadInput
          description="Upload a photo of the packaging..."
          name={`${name}.packageImage`}
        />
      </Field>
      <Field
        name={`${name}.certificateFile`}
        label="Certificate"
        hint="Provide a photo or PDF file, max 5 MB"
      >
        <UploadInput
          description="Upload a PDF certificate..."
          name={`${name}.certificateFile`}
        />
      </Field>
      <input
        type="hidden"
        name={`${name}.typeId`}
        value={id}
        ref={register()}
      />
    </Box>
  );
};

export default Product;
