import React, { memo } from "react";
import { Heading } from "@chakra-ui/core";
import { useMediaQuery } from "../../chakra/useMediaQuery";

interface Props {
  children: string;
}

const Headline = ({ children }: Props) => {
  const fontSize = useMediaQuery(["lg", "xl"]);
  return (
    <Heading color="blue.600" fontSize={fontSize} mb={{ base: "4", md: "6" }}>
      {children}
    </Heading>
  );
};

export default memo(Headline);
