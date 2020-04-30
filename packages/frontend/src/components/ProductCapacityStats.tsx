import * as React from "react";
import { Box, Heading, Image, SimpleGrid } from "@chakra-ui/core";
import { Capacity } from "../types/Capacity";
import Card from "./chakra/Card";

type Props = {
  items: Capacity[];
};

export const ProductCapacityStats: React.FC<Props> = ({ items }) => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 4 }}
      spacing={{ base: 4, md: 8 }}
      mx="auto"
      mb="24"
    >
      {items.map((capacity) => {
        return (
          <Card bg="white" p={6} key={capacity.title}>
            <Heading
              size="xs"
              textTransform="uppercase"
              mb={2}
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
            >
              {capacity.title}
            </Heading>
            <Heading size="lg">
              {new Intl.NumberFormat("en-US").format(capacity.capacity || 0)}
            </Heading>
            <img
              style={{ margin: "0 auto" }}
              src={`/images/productTypes/${capacity.title
                .replace(" ", "")
                .toLowerCase()}.svg`}
              alt=""
            />
          </Card>
        );
      })}
    </SimpleGrid>
  );
};

export default ProductCapacityStats;
