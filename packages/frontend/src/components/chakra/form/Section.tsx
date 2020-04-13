import React, { ReactNode } from "react";
import { Text, Box } from "@chakra-ui/core";
import { BorderHeadline } from "../BorderHeadline";
interface Props {
  children: ReactNode;
  title: string;
  mb?: string;
}

export const Section = ({ children, title, mb }: Props) => (
  <Box mb={mb}>
    <BorderHeadline>{title}</BorderHeadline>
    <Box>{children}</Box>
  </Box>
);
