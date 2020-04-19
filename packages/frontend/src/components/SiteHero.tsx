import * as React from "react";
import { Box, BoxProps } from "@chakra-ui/core";
import { Heading } from "@chakra-ui/core";

type Props = {
  title: string;
  description?: string;
} & BoxProps;

const SiteHero: React.FC<Props> = (props) => {
  const { title, description, ...rest } = props;
  return (
    <Box
      mb={{ base: 4, md: 10, lg: 12 }}
      mx="auto"
      textAlign="center"
      maxWidth="720px"
      {...rest}
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
