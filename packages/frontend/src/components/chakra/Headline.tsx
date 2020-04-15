import React, { memo } from "react";
import { Heading, HeadingProps } from "@chakra-ui/core";
import { useMediaQuery } from "../../chakra/useMediaQuery";

const sizeValueMapping = {
  sm: ["sm", "md"],
  md: ["md", "lg"],
  lg: ["lg", "xl"],
  xl: ["xl", "2xl"],
};

const Headline = ({ children, mt, mb, size = "lg", color }: HeadingProps) => {
  const fontSize = useMediaQuery(sizeValueMapping[size]);
  return (
    <Heading
      color={color || "blue.600"}
      fontSize={fontSize}
      mb={mb || { base: "4", md: "6" }}
      mt={mt}
    >
      {children}
    </Heading>
  );
};

export default memo(Headline);
