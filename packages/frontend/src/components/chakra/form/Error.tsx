import React, { ReactElement } from "react";
import { Text } from "@chakra-ui/core";
interface Props {
  children: string;
}

export default function Error({ children }: Props): ReactElement {
  return (
    <Text color="red.600" mt="1">
      {children}
    </Text>
  );
}
