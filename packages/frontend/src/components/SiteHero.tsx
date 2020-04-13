import * as React from "react";
import Box from "@chakra-ui/core/dist/Box";
import Heading from "@chakra-ui/core/dist/Heading";

type Props = {
  title: string;
  description?: string;
};

const SiteHero: React.FC<Props> = ({ title, description }) => {
  return (
    <Box
      mb={{ base: 4, md: 12, lg: 24 }}
      mx="auto"
      textAlign="center"
      maxWidth="720px"
    >
      <Heading as="h1" mb={description ? 4 : 0} fontWeight="500">
        {title}
      </Heading>
      {description && (
        <Heading as="h3" size="lg" mb={4} fontWeight="normal">
          {description}
        </Heading>
      )}
    </Box>
  );
};

export default SiteHero;
