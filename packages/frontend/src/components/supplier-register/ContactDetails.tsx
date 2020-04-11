import React from "react";
import SectionTitle from "./SectionTitle";
import { Field } from "../chakra/form/Field";
import { Input } from "@chakra-ui/core";
import { FieldRow } from "../chakra/form/FieldRow";
import { useFormContext } from "react-hook-form";

interface Props {}

export const ContactDetails = (props: Props) => {
  const { register, errors } = useFormContext();

  return (
    <React.Fragment>
      <SectionTitle>Contact details</SectionTitle>
      <Field name="companyName" label="Company name" errors={errors}>
        <Input
          name="companyName"
          ref={register({ required: true, pattern: /.{3}/ })}
        />
      </Field>
      <FieldRow mt="6">
        <Field name="firstName" label="Firstname" flexGrow={1} errors={errors}>
          <Input
            name="firstName"
            ref={register({ required: true, pattern: /.{3}/ })}
          />
        </Field>
        <Field name="lastName" label="Lastname" flexGrow={1} errors={errors}>
          <Input
            name="lastName"
            ref={register({ required: true, pattern: /.{3}/ })}
          />
        </Field>
      </FieldRow>
      <Field name="email" label="E-Mail" errors={errors}>
        <Input
          name="email"
          ref={register({ required: true, pattern: /.{3}/ })}
        />
      </Field>
    </React.Fragment>
  );
};
