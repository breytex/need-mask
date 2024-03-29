import React, { ReactElement, memo } from "react";
import { FormControl, FormLabel, FormHelperText, Box } from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";
import Error from "./Error";
import { get } from "lodash";

interface Props {
  children: ReactElement;
  name: string;
  hint?: string;
  label?: string;
  flexGrow?: number;
  mt?: string;
  mb?: string;
  isRequired?: boolean;
}

const errorMessages = {
  pattern: "The input format is not valid.",
  required: "This field is required.",
  min: "Please enter a value within the range.",
};

export const Field = memo(
  (props: Props): ReactElement => {
    const {
      children: child,
      name,
      hint,
      label,
      flexGrow,
      mb,
      mt,
      isRequired = false,
    } = props;
    const { errors } = useFormContext();

    // useTraceUpdate(props);
    const fieldError = get(errors, name, null);

    return (
      <Box flexGrow={flexGrow} mb={mb || "4"} mt={mt}>
        <FormControl>
          {label && (
            <FormLabel htmlFor={name}>
              {label}
              {isRequired ? " *" : ""}
            </FormLabel>
          )}
          {React.cloneElement(child, { ...child.props, size: "lg" })}
          {hint && (
            <FormHelperText color="gray.700" id={`hint-${name}`}>
              {hint}
            </FormHelperText>
          )}
          {fieldError && <Error>{errorMessages[fieldError.type]}</Error>}
        </FormControl>
      </Box>
    );
  }
);
