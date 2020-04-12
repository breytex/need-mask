import React from "react";
import { Field } from "../chakra/form/Field";
import { Input } from "@chakra-ui/core";
import { FieldRow } from "../chakra/form/FieldRow";
import { useFormContext } from "react-hook-form";

interface Props {}

export const ContactDetails = (props: Props) => {
  const { register, errors } = useFormContext();

  return (
    <React.Fragment>
      <FieldRow mt="6">
        <Field name="firstName" label="Firstname" flexGrow={1}>
          <Input
            name="firstName"
            ref={register({ required: true, pattern: /.{3}/ })}
          />
        </Field>
        <Field name="lastName" label="Lastname" flexGrow={1}>
          <Input
            name="lastName"
            ref={register({ required: true, pattern: /.{3}/ })}
          />
        </Field>
      </FieldRow>
      <Field
        name="email"
        label="E-Mail"
        hint="You will receive a verification link to this address later"
      >
        <Input
          name="email"
          ref={register({ required: true, pattern: /.{3}/ })}
        />
      </Field>
      <FieldRow>
        <Field name="companyName" label="Company name" flexGrow={1}>
          <Input
            name="companyName"
            ref={register({ required: true, pattern: /.{3}/ })}
          />
        </Field>
        <Field name="vatNumber" label="Company VAT number" flexGrow={1}>
          <Input
            name="vatNumber"
            ref={register({ required: true, pattern: /.{3}/ })}
          />
        </Field>
      </FieldRow>
    </React.Fragment>
  );
};
