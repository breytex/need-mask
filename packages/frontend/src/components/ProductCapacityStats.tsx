import * as React from "react";
import { Box, Heading, Image, SimpleGrid } from "@chakra-ui/core/dist";
import { Capacity } from "../types/Capacity";

type Props = {
  items: Capacity[];
};

export const ProductCapacityStats: React.FC<Props> = ({ items }) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mx="auto" mb="24">
      {items.map((capacity) => {
        return (
          <Box bg="white" p={8} key={capacity.title}>
            <Heading
              size="sm"
              textTransform="uppercase"
              mb={2}
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
            >
              {capacity.title}
            </Heading>
            <Heading size="lg">{capacity.capacity || 0}</Heading>
            <Image
              src={`/images/productTypes/${capacity.title.toLowerCase()}.svg`}
              alt=""
              mx="auto"
            />
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default ProductCapacityStats;
