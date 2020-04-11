import * as React from "react";
import { Image, Box, Flex } from "@chakra-ui/core/dist";

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
        <Image height="100px" src="/images/ita-rwth.png" alt="RWTH" p={2} />
      </Box>
      <Box>
        <Image height="50px" src="/images/ghzeri.png" alt="Ghzeri" p={2} />
      </Box>
    </Flex>
  );
};

export default Testimonials;
