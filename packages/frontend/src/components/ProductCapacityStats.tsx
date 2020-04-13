import * as React from "react";
import { GET_CAPACITY_PER_PRODUCT } from "../graphql/queries/capacity";
import { Box, Heading, Image, SimpleGrid } from "@chakra-ui/core/dist";

type Capacity = {
  title: string;
  capacity: number;
};

export const ProductCapacityStats: React.FC = () => {
  React.useEffect(() => {
    fetch(process.env.HASURA_URL, {
      method: "POST",
      body: JSON.stringify({ query: GET_CAPACITY_PER_PRODUCT }),
    })
      .then((response) => response.json())
      .then((json) => {
        const {
          data: {
            productTypes_aggregate: { nodes },
          },
        } = json;

        setCapacities(
          nodes.map((node) => ({
            title: node.title,
            capacity: node.products_aggregate.aggregate.sum.capacity,
          }))
        );
      });
  }, []);

  const [capacities, setCapacities] = React.useState<Capacity[]>([]);

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mx="auto" mb="24">
      {capacities.map((capacity) => {
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
            <Image src="/images/productTypes/gown.svg" alt="" mx="auto" />
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default ProductCapacityStats;
