import * as React from "react";
import { Box, Flex } from "@chakra-ui/core";

const Testimonials = () => {
  return (
    <Flex
      bg="white"
      p={4}
      justify="center"
      align="center"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Box>
        <img
          style={{ padding: "0.5rem", height: "100px" }}
          src="/images/ita-rwth.png"
          alt="RWTH"
        />
      </Box>
    </Flex>
  );
};

export default Testimonials;
