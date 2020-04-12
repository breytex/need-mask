import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Box, Input } from "@chakra-ui/core/dist";
import { Field } from "../chakra/form/Field";
import Select from "@chakra-ui/core/dist/Select";

type Props = {
  id: string;
};

const ContactDetails: React.FC<Props> = () => {
  const { register, watch } = useFormContext();

  return (
    <Box mx={-2}>
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

export default ContactDetails;
