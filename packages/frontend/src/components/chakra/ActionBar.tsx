import React, { ReactNode } from "react";
import { Flex, Box } from "@chakra-ui/core";
import LinkButton from "./LinkButton";

interface Props {
  leftComponent: ReactNode;
  children: ReactNode;
}

const ActionBar = ({ children, leftComponent }: Props) => {
  return (
    <Flex
      className="ActionBar"
      justify="space-between"
      bg="#fafafa"
      borderTop="1px solid"
      borderTopColor="gray.200"
      p="2"
    >
      <Box className="ActionBar__Items-Left">{leftComponent}</Box>
      <Box className="ActionBar__Items-Right">{children}</Box>
    </Flex>
  );
};

export default ActionBar;
