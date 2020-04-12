import React from "react";
import { Text, Box } from "@chakra-ui/core";
import Headline from "../Headline";
interface Props {
  children: string;
  title: string;
}

export const Section = ({ children, title }) => (
  <React.Fragment>
    <Headline>{title}</Headline>
    <Box px={{ base: "0", md: "30px" }}>{children}</Box>
  </React.Fragment>
);
