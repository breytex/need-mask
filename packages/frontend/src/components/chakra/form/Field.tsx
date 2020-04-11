import React, { ReactElement, useCallback, memo } from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  Text,
} from "@chakra-ui/core";
import { useTraceUpdate } from "../../../hooks/useTraceUpdate";

interface Props {
  children: ReactElement;
  name: string;
  hint?: string;
  label: string;
  flexGrow?: number;
  mt?: string;
  mb?: string;
  errors: any;
}

const errorMessages = {
  pattern: "The input format is not valid.",
  required: "This field is required.",
};

export const Field = memo(
  (props: Props): ReactElement => {
    const { children, name, hint, label, flexGrow, errors, mb, mt } = props;

    // useTraceUpdate(props);

    const fieldError = errors[name];
    return (
      <Box flexGrow={flexGrow} mr="4" mb={mb || "4"} mt={mt}>
        <FormControl>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          {children}
          {hint && <FormHelperText id={`hint-${name}`}>{hint}</FormHelperText>}
          {fieldError && (
            <Text color="red.500" mt="1">
              {errorMessages[fieldError.type]}
            </Text>
          )}
        </FormControl>
      </Box>
    );
  }
);
