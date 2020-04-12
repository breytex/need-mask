import React from "react";
import { Text, Box } from "@chakra-ui/core";
import { BorderHeadline } from "../BorderHeadline";
interface Props {
  children: string;
  title: string;
}

export const Section = ({ children, title }) => (
  <React.Fragment>
    <BorderHeadline>{title}</BorderHeadline>
    <Box px={{ base: "0", md: "30px" }}>{children}</Box>
  </React.Fragment>
);
