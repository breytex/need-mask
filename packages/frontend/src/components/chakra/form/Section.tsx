import React, { ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/core";
import { BorderHeadline } from "../BorderHeadline";
interface Props extends BoxProps {
  children: ReactNode;
  title: string;
}

export const Section = ({ children, title, ...rest }: Props) => (
  <Box {...rest}>
    <BorderHeadline>{title}</BorderHeadline>
    <Box>{children}</Box>
  </Box>
);
