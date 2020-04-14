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
  Button,
  Select,
} from "@chakra-ui/core";
import { Field } from "../chakra/form/Field";
import { FieldRow } from "../chakra/form/FieldRow";
import { useFormContext } from "react-hook-form";
import UploadInput from "../chakra/UploadInput";
import InputMask from "react-input-mask";
import MyNumberInput from "../chakra/form/NumberInput";
interface Props {
  id: string;
  title: string;
  onDelete: (id) => void;
  index: number;
  subTypes: string;
}

const Product = (props: Props) => {
  const { title, onDelete, index, id, subTypes } = props;
  const { register, watch, errors } = useFormContext();
  const name = `products.data[${index}]`;
  console.log({ errors });
  const titleOptions = subTypes.split(",").map((t) => t.trim());

  return (
    <Box mb="6" p="4" bg="white" shadow="md" mx={{ base: "-15px", md: "0" }}>
      <Box float="right">
        <Button
          variant="outline"
          size="sm"
          mt="-5px"
          onClick={() => onDelete(id)}
        >
          <Icon name="close" />
        </Button>
      </Box>
      <Heading fontSize="lg">
        Product {index + 1}: {title}
      </Heading>
      <Field name={`${name}.title`} label="Product type" mt="4" isRequired>
        <Select
          placeholder="Select an option"
          name={`${name}.title`}
          ref={register({ required: true })}
        >
          {titleOptions.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </Select>
      </Field>
      <FieldRow mt="3">
        <Field
          label="Min price"
          name={`${name}.minPrice`}
          flexGrow={1}
          isRequired
        >
          <NumberInput
            defaultValue={watch(`${name}.minPrice`) || 0.3}
            precision={2}
            step={0.01}
          >
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
          <NumberInput
            defaultValue={watch(`${name}.maxPrice`) || 0.3}
            precision={2}
            step={0.01}
          >
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
          <MyNumberInput
            min={1000}
            defaultValue={1000}
            step={1000}
            name={`${name}.capacity`}
          ></MyNumberInput>
        </Field>
        <Field
          label="Lead time"
          hint="Expected time to delivery in days"
          name={`${name}.leadTime`}
          flexGrow={1}
          isRequired
        >
          <MyNumberInput
            min={1}
            step={1}
            defaultValue={14}
            name={`${name}.leadTime`}
          ></MyNumberInput>
        </Field>
        <Field
          label="Minimum order amount"
          hint=" "
          name={`${name}.minOrderAmount`}
          flexGrow={1}
          isRequired
        >
          <NumberInput
            defaultValue={watch(`${name}.minOrderAmount`) || 1000}
            min={1000}
            step={1000}
          >
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

      <Field
        name={`${name}.description`}
        label="Description"
        hint="Max 500 characters"
      >
        <Textarea
          name={`${name}.description`}
          ref={register({
            maxLength: 500,
          })}
        />
      </Field>
      <Field
        name={`${name}.productImage`}
        label="Product photo"
        hint="Max 5 MB"
        isRequired
      >
        <UploadInput
          description="Upload a photo of the product"
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
          description="Upload a photo of the packaging"
          name={`${name}.packageImage`}
        />
      </Field>
      <Field
        name={`${name}.certificateFile`}
        label="Certificate"
        hint="Provide a photo or PDF file, max 5 MB"
      >
        <UploadInput
          description="Upload a PDF certificate"
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
