import React from "react";
import { Field } from "../chakra/form/Field";
import { Input } from "@chakra-ui/core";
import { FieldRow } from "../chakra/form/FieldRow";
import { useFormContext } from "react-hook-form";
import { EMAIL_REGEX, WEB_REGEX } from "../../constants/regex";

interface Props {}

export const ContactDetails = (props: Props) => {
  const { register, errors } = useFormContext();

  return (
    <React.Fragment>
      <FieldRow mt="6">
        <Field name="firstName" label="First name" flexGrow={1} isRequired>
          <Input
            name="firstName"
            maxLength={255}
            ref={register({ required: true })}
          />
        </Field>
        <Field name="lastName" label="Last name" flexGrow={1} isRequired>
          <Input
            name="lastName"
            maxLength={255}
            ref={register({ required: true })}
          />
        </Field>
      </FieldRow>
      <FieldRow>
        <Field name="companyName" label="Company name" flexGrow={1} isRequired>
          <Input
            name="companyName"
            maxLength={255}
            ref={register({ required: true })}
          />
        </Field>
        <Field name="vatNumber" label="Company VAT number" flexGrow={1}>
          <Input name="vatNumber" maxLength={255} ref={register()} />
        </Field>
      </FieldRow>
      <Field
        name="email"
        label="E-Mail"
        hint="You will receive a verification link to this address later"
        isRequired
      >
        <Input
          name="email"
          maxLength={255}
          ref={register({
            required: true,
            pattern: EMAIL_REGEX,
          })}
        />
      </Field>
      <Field
        name="web"
        label="Web address"
        hint="You can add a link to your companies website or to your LinkedIn profile"
      >
        <Input
          name="web"
          maxLength={255}
          ref={register({ pattern: WEB_REGEX })}
        />
      </Field>
    </React.Fragment>
  );
};
