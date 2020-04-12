import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Box, Input } from "@chakra-ui/core/dist";
import { Field } from "../chakra/form/Field";

type Props = {};

const ContactAddress: React.FC<Props> = () => {
  const { register } = useFormContext();

  return (
    <Box>
      <Field name="continent" label="Continent">
        <Input
          name="continent"
          ref={register({ required: true, pattern: /.{3}/ })}
        />
      </Field>
      <Field name="country" label="Country">
        <Input
          name="country"
          ref={register({ required: true, pattern: /.{3}/ })}
        />
      </Field>
      <Field name="city" label="City">
        <Input
          name="city"
          ref={register({ required: true, pattern: /.{3}/ })}
        />
      </Field>
      <Field name="zip" label="Zip">
        <Input name="zip" ref={register({ required: true, pattern: /.{3}/ })} />
      </Field>
      <Field name="street" label="Street">
        <Input
          name="street"
          ref={register({ required: true, pattern: /.{3}/ })}
        />
      </Field>
    </Box>
  );
};

export default ContactAddress;
