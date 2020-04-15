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
      className="ListingRow"
      direction="column"
      p="4"
      pb="6"
      bg="white"
      borderBottom="1px solid #E0E0E0"
      borderLeft={`5px solid ${customTheme.colors.blue["500"]}`}
      shadow="sm"
      borderRadius="sm"
    >
      <Flex direction={{ base: "column", md: "row" }} justify="space-between">
        <Flex className="ListingRow__Info" direction="column" w="40%">
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
        <Box className="ListingRow__Details" flexGrow={2} flexBasis="70%">
          <Flex justify="flex-end" className="ProductTypeEntry">
            <Text fontSize="sm" fontWeight="500" w="8em">
              Products:
            </Text>
            <Text ml="4" fontSize="sm" w="8em">
              {/* <Icon name="euro" size="15px" color="gray.700" /> */}
              Price:
            </Text>
            <Text ml="3" fontSize="sm" w="8em">
              Delivery time:
            </Text>
            <Text ml="3" fontSize="sm" w="8em">
              Total capacity:
            </Text>
          </Flex>
          {productsList.Mask && (
            <ProductTypeEntry category="Masks" products={productsList.Mask} />
          )}
          {productsList.Headgear && (
            <ProductTypeEntry
              category="Headgear"
              products={productsList.Headgear}
            />
          )}
          {productsList.Clothing && (
            <ProductTypeEntry
              category="Clothing"
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
    </Flex>
  );
};
