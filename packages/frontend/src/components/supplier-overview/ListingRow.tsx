import React, { useMemo } from "react";
import Link from "next/link";
import {
  Box,
  BoxProps,
  Flex,
  Text,
  Heading,
  Badge,
  Icon,
  Button,
} from "@chakra-ui/core";
import { Supplier } from "../../types/Supplier";
import { customTheme } from "../../chakra/theme";
import { Product } from "../../types/Product";
import ProductListEntry from "./ProductTypeEntry";
import ProductTypeEntry from "./ProductTypeEntry";
import Card from "../chakra/Card";
import { countries } from "../../types/Geographic";
import LinkButton from "../chakra/LinkButton";
import ActionBar from "../chakra/ActionBar";

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

const TableHeading = (props: BoxProps) => (
  <Text
    fontSize="13px"
    fontWeight="500"
    w="120px"
    color="gray.600"
    {...props}
  />
);

export const ListingRow = (props: Props) => {
  const { id, companyName, city, country, updatedAt, products } = props;

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
      result[key] = value.sort((a, b) => a.title.localeCompare(b.title));
    });
    return result;
  }, [products]);

  const showNewBadge = useMemo(() => isLessOld(updatedAt), [updatedAt]);

  const countryString =
    countries.find((c) => c.code === country)?.name || country;

  return (
    <Card>
      <Flex className="ListingRow" direction="column" p="4" pb="6">
        <Flex direction={{ base: "column", lg: "row" }} justify="space-between">
          <Flex
            className="ListingRow__Info"
            direction="column"
            w={{ base: "100%", md: "40%" }}
          >
            <Link href={`/suppliers/[id]`} as={`/suppliers/${id}`}>
              <a>
                <Heading size="md">{companyName}</Heading>
              </a>
            </Link>
            <Box color="gray.700">
              {city && country && (
                <span>
                  ({city}, {countryString})
                </span>
              )}
            </Box>
          </Flex>
          <Box
            className="ListingRow__Details"
            flexGrow={2}
            flexBasis={{ base: "100%", md: "70%" }}
          >
            <Flex
              justify={{ base: "flex-start", md: "flex-end" }}
              className="ProductTypeEntry"
              mt={{ base: "3", lg: "0" }}
            >
              <TableHeading>Products</TableHeading>
              <TableHeading ml="4">
                {/* <Icon name="euro" size="15px" color="gray.700" /> */}
                Price range
              </TableHeading>
              <TableHeading ml="4" className="hideWhenTooSmall">
                Delivery time
              </TableHeading>
              <TableHeading ml="4">Weekly capacity</TableHeading>
            </Flex>
            {productsList.Mask && (
              <ProductTypeEntry category="Masks" products={productsList.Mask} />
            )}
            {productsList["Community Mask"] && (
              <ProductTypeEntry
                category="Com. Mask"
                products={productsList["Community Mask"]}
              />
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
        </Flex>
      </Flex>
      <ActionBar
        leftComponent={
          showNewBadge && (
            <Box justifySelf="flex-start">
              <Badge fontSize="0.8em" ml="2" mt="1">
                New
              </Badge>
            </Box>
          )
        }
      >
        <LinkButton
          href={"/suppliers/[id]/request"}
          params={{ id }}
          size="sm"
          mr="3"
        >
          Contact supplier
        </LinkButton>
        <LinkButton
          href={"/suppliers/[id]"}
          params={{ id }}
          size="sm"
          variantColor="blue"
        >
          More details
        </LinkButton>
      </ActionBar>
    </Card>
  );
};
