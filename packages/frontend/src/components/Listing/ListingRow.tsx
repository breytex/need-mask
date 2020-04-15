import React, { useMemo } from "react";
import Link from "next/link";
import { Box, Flex, Text, Heading, Badge, Icon } from "@chakra-ui/core";
import { Supplier } from "../../types/Supplier";
import { customTheme } from "../../chakra/theme";
import { capitalize } from "lodash";
import { Product } from "../../types/Product";
import ProductListEntry from "./ProductTypeEntry";
import ProductTypeEntry from "./ProductTypeEntry";

interface ComponentProps {}

type Props = ComponentProps & Supplier;

interface ProductListType {
  Mask?: Product[];
  Clothing?: Product[];
  Headgear?: Product[];
}

const timelimitToShowNewBadge = 60 * 60 * 24 * 3; // 3 days
const isLessOld = (date) => {
  if (!date) return false;
  const now = new Date().getTime();
  const dateInSec = new Date(date).getTime();
  return now - timelimitToShowNewBadge > dateInSec;
};

export const ListingRow = (props: Props) => {
  const { id, companyName, city, country, updatedAt, products } = props;

  const productTypes = useMemo(() => {
    if (!products) return [];
    const result = {};
    products.forEach((product) => {
      if (product.productType) {
        result[product.productType.title] = true;
      }
    });

    return Object.keys(result);
  }, [products]);

  const productsList: ProductListType = useMemo<ProductListType>(() => {
    if (!products) return {};
    const result: ProductListType = {};
    products.forEach((product) => {
      if (product.productType) {
        const productTypeTitle = product.productType.title;
        if (!result[productTypeTitle]) {
          result[productTypeTitle] = [product];
          return;
        }
        result[productTypeTitle] = [...result[productTypeTitle], product];
      }
    });

    Object.entries(result).forEach(([key, value]: [string, Product[]]) => {
      result[key] = value
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((p) => {
          p.title = capitalize(p.title);
          return p;
        });
    });
    return result;
  }, [products]);
  console.log({ productsList });
  const showNewBadge = useMemo(() => isLessOld(updatedAt), [updatedAt]);

  return (
    <Flex
      direction="column"
      p="4"
      bg="white"
      borderBottom="1px solid #E0E0E0"
      borderLeft={`5px solid ${customTheme.colors.blue["500"]}`}
      shadow="sm"
      borderRadius="sm"
    >
      <Flex direction={{ base: "column", md: "row" }} justify="space-between">
        <Flex direction="column" w="40%">
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
        <Box flexGrow={2} flexBasis="70%">
          {productsList.Mask && (
            <ProductTypeEntry catname="Masks" products={productsList.Mask} />
          )}
          {productsList.Headgear && (
            <ProductTypeEntry
              catname="Headgear"
              products={productsList.Headgear}
            />
          )}
          {productsList.Clothing && (
            <ProductTypeEntry
              catname="Clothing"
              products={productsList.Clothing}
            />
          )}
        </Box>
        {/* {showNewBadge && (
          <Box>
            <Badge mr="2" variantColor="blue">
              New
            </Badge>
          </Box>
        )} */}
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
