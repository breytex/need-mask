import React, { memo } from "react";
import { Heading } from "@chakra-ui/core";
import { useMediaQuery } from "../../chakra/useMediaQuery";

interface Props {
  children: string;
  mt?: string;
  mb?: string;
}

const Headline = ({ children, mt, mb }: Props) => {
  const fontSize = useMediaQuery(["lg", "xl"]);
  return (
    <Heading
      color="blue.600"
      fontSize={fontSize}
      mb={mb || { base: "4", md: "6" }}
      mt={mt}
    >
      {children}
    </Heading>
  );
};

export default memo(Headline);
