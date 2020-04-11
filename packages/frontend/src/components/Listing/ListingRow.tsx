import React, { useMemo } from "react";
import Link from "next/link";
import { Box, Flex, Text, Heading, Badge } from "@chakra-ui/core";
import { Supplier } from "../../types/Supplier";

interface ComponentProps {}

type Props = ComponentProps & Supplier;

const timelimitToShowNewBadge = 60 * 60 * 24 * 3; // 3 days
const isLessOld = (date) => {
  if (!date) return false;
  const now = new Date().getTime();
  const dateInSec = new Date(date).getTime();
  return now - timelimitToShowNewBadge > dateInSec;
};

export const ListingRow = (props: Props) => {
  const { id, companyName, city, country, updatedAt, products } = props;

  let productTypes = useMemo(() => {
    if (!products) return [];
    const result = {};
    products.forEach((product) => {
      if (product.productType) {
        result[product.productType.title] = true;
      }
    });

    return Object.keys(result);
  }, [products]);

  const showNewBadge = useMemo(() => isLessOld(updatedAt), [updatedAt]);

  return (
    <Flex
      direction="column"
      p="4"
      bg="white"
      borderBottom="1px solid #E0E0E0"
      borderLeft="5px solid #5fb4e4"
      shadow="sm"
      borderRadius="sm"
    >
      <Flex direction="row" justify="space-between">
        <Flex direction="column">
          <Link href={`/suppliers/[id]`} as={`/suppliers/${id}`}>
            <a>
              <Heading size="md">{companyName}</Heading>
            </a>
          </Link>
          <Box color="gray.500">
            {city && country && (
              <span>
                ({city}, {country})
              </span>
            )}
          </Box>
        </Flex>
        {showNewBadge && (
          <Box>
            <Badge mr="2" variantColor="green">
              New
            </Badge>
          </Box>
        )}
      </Flex>
      <Flex direction="row" mt="2">
        <Text color="gray.800">Products:</Text>{" "}
        <Text color="gray.800" fontWeight="semibold" ml="2">
          {productTypes.join(", ")}
        </Text>
      </Flex>
    </Flex>
  );
};
