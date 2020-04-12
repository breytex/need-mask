import React, { ReactElement } from "react";
import { Text } from "@chakra-ui/core";
interface Props {
  children: string;
  ml?: string;
  mx?: string;
}

export default function Error({ children, ml, mx }: Props): ReactElement {
  return (
    <Text color="red.600" mt="1" ml={ml} mx={mx}>
      {children}
    </Text>
  );
}
