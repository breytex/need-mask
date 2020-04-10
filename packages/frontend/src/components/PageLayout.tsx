import React, { ReactElement } from "react";
import { Flex, Box } from "@chakra-ui/core";
interface Props {
  children: ReactElement;
}

export default function PageLayout(props: Props): ReactElement {
  const { children } = props;

  return (
    <Flex justify="center">
      <Box w="100%" maxW="1332px" p="4">
        {children}
      </Box>
    </Flex>
  );
}
