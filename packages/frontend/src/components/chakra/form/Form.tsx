import React, { ReactElement } from "react";
import { FormContext, useForm, Mode, UseFormOptions } from "react-hook-form";
import { ValidationContext } from "graphql";
interface Props {
  children: ReactElement[];
  defaultValues?: object;
  onSubmit: (data) => void;
}
// See: https://react-hook-form.com/api for options
const formConfigs: UseFormOptions<object, ValidationContext> = {
  mode: "onSubmit",
  reValidateMode: "onChange",
};

const Form = (props: Props) => {
  const { defaultValues, children, onSubmit } = props;
  const methods = useForm({ ...formConfigs, defaultValues });

  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormContext>
  );
};

export default Form;
