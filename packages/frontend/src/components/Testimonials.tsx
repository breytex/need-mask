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
      <Box mx={{ base: "0", md: "6" }}>
        <img
          style={{ padding: "0.5rem", height: "auto", maxWidth: "270px" }}
          src="/images/ghzeri.png"
          alt="RWTH"
        />
      </Box>
      <Box mt={{ base: "5", md: "0" }}>
        <a href="https://vercel.com/" target="_blank" rel="noopener">
          <img src="/images/powered-by-vercel.svg" alt="Powered by Vercel" />
        </a>
      </Box>
    </Flex>
  );
};

export default Testimonials;
