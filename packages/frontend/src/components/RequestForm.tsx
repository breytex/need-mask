import * as React from "react";
import Form from "./chakra/form/Form";
import { Box, Button, Input } from "@chakra-ui/core/dist";
import { Field } from "./chakra/form/Field";
import { useFormContext } from "react-hook-form";

import Select from "@chakra-ui/core/dist/Select";
import { Product } from "../types/Supplier";
import Text from "@chakra-ui/core/dist/Text";
import Checkbox from "@chakra-ui/core/dist/Checkbox";
import { useState } from "react";
import FormLabel from "@chakra-ui/core/dist/FormLabel";
import { useMutation } from "urql";
import { ADD_REQUEST } from "../graphql/mutations/addRequest";
import SuccessMessage from "./chakra/SuccessMessage";
import { Spinner } from "./chakra/Spinner";

type FormFieldProps = {
  id: string;
};

const UserFields: React.FC<FormFieldProps> = () => {
  const { register, errors, watch } = useFormContext();

  return (
    <Box>
      <Field name="firstName" label="First Name">
        <Input name="firstName" ref={register({ required: true })} />
      </Field>

      <Field name="lastName" label="Last Name">
        <Input name="lastName" ref={register({ required: true })} />
      </Field>

      <Field name="email" label="Email">
        <Input name="email" type="email" ref={register({ required: true })} />
      </Field>

      <Field name="phoneNumber" label="Phone Number">
        <Input
          name="phoneNumber"
          ref={register({ required: true })}
          placeholder="+"
        />
      </Field>

      <Field name="companyType" label="Company Type">
        <Select
          name="companyType"
          ref={register({ required: true })}
          defaultValue="clinic"
        >
          <option value="clinic">Clinic</option>
          <option value="doctor">Doctor</option>
          <option value="publicService">Public service</option>
          <option value="other">Other</option>
        </Select>
      </Field>

      <Field name="companyName" label={(watch("companyType") || "") + ` Name`}>
        <Input name="companyName" ref={register({ required: true })} />
      </Field>
    </Box>
  );
};

const AddressFields: React.FC<FormFieldProps> = () => {
  const { register, errors } = useFormContext();

  return (
    <Box>
      <Field name="continent" label="Continent">
        <Input name="continent" ref={register({ required: true })} />
      </Field>
      <Field name="country" label="Country">
        <Input name="country" ref={register({ required: true })} />
      </Field>
      <Field name="city" label="City">
        <Input name="city" ref={register({ required: true })} />
      </Field>
      <Field name="zip" label="Zip">
        <Input name="zip" ref={register({ required: true })} />
      </Field>
      <Field name="street" label="Street">
        <Input name="street" ref={register({ required: true })} />
      </Field>
    </Box>
  );
};

type ProductFieldsType = {
  products: Product[];
};

const ProductFields: React.FC<ProductFieldsType> = ({ products }) => {
  const { register, errors } = useFormContext();

  return (
    <Box>
      {products.map((product) => {
        const [checked, check] = useState(false);

        return (
          <Box key={product.id}>
            <FormLabel>
              <Checkbox isChecked={checked} onChange={() => check((p) => !p)}>
                {product.title}{" "}
                <Text display="inline-block" fontSize="sm">
                  ({product.productType.title})
                </Text>
              </Checkbox>
            </FormLabel>

            {checked && (
              <Field key={product.id} name={product.id}>
                <Input
                  type="number"
                  name={product.id}
                  ref={register({ required: true })}
                  step={1000}
                  min={product.minOrderAmount}
                  defaultValue={product.minOrderAmount}
                />
              </Field>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

type Props = {
  supplerId: string;
  withAddress?: boolean;
  products: Product[];
};

const RequestForm: React.FC<Props> = ({ supplerId, withAddress, products }) => {
  const [{ fetching, error, data }, mutateRequest] = useMutation(ADD_REQUEST);

  function onSubmit(d) {
    const {
      companyName,
      companyType,
      email,
      firstName,
      lastName,
      phoneNumber,
    } = d;

    mutateRequest({
      data: {
        companyName,
        companyType,
        email,
        firstName,
        lastName,
        phoneNumber,
      },
    });
  }

  if (fetching) {
    return <Spinner />;
  }

  if (data) {
    return (
      <SuccessMessage
        title="Thanks!"
        buttonTitle="Back to suppliers"
        onClickPath="/suppliers"
      >
        You have successfully submitted your request to need-mask.com.
      </SuccessMessage>
    );
  }

  return (
    <Form onSubmit={onSubmit}>
      <UserFields id={supplerId} />
      {withAddress && <AddressFields id={supplerId} />}

      <ProductFields products={products} />

      <Button type="submit" isFullWidth>
        Submit your request
      </Button>
    </Form>
  );
};

export default RequestForm;
