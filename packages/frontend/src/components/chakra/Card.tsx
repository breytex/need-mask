import React, { ReactElement, ReactNode } from "react";
import { PseudoBox, BoxProps } from "@chakra-ui/core";
import styled from "@emotion/styled";

const CardWrapper = styled(PseudoBox)`
  transition: box-shadow 0.3s ease-in-out;
`;

export default function Card({ children, ...rest }: BoxProps): ReactElement {
  return (
    <CardWrapper
      border="1px solid"
      borderColor="gray.200"
      borderRadius="5px"
      mb="4"
      _hover={{ shadow: "cardHover" }}
      {...rest}
    >
      {children}
    </CardWrapper>
  );
}
