import React, { useMemo } from "react";
import {
  Flex,
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from "@chakra-ui/core";
import Link from "next/link";
import ProductCard from "../supplier-detail-page/ProductCard";
import { Product } from "../../types/Product";

import PageTitle from "../chakra/PageTitle";
import LinkButton from "../chakra/LinkButton";
import { Supplier } from "../../types/Supplier";

interface Props {
  supplier: Supplier;
}

interface ProductListType {
  Mask?: Product[];
  Clothing?: Product[];
  Headgear?: Product[];
}

const SupplierDetailPage = (props: Props) => {
  const { id, companyName, city, country, web, products } = props.supplier;

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

  const realWebAddress = web?.includes("http") ? web : `https://${web}`;

  return (
    <>
      <Breadcrumb fontSize="sm" mb="4">
        <BreadcrumbItem>
          <Link href="/suppliers">
            <BreadcrumbLink>Suppliers</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{companyName}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex
        justify="space-between"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box>
          <PageTitle mb="0">{companyName}</PageTitle>
          <Text fontSize="25px" mt="-8px" color="gray.700">
            {city}, {country}
          </Text>
          {web && (
            <a
              href={
                realWebAddress +
                "/?utm_source=need-mask&utm_medium=link&utm_campaign=referring"
              }
              target="_blank"
              rel="noopener"
            >
              <Icon name="external-link" mb="3px" /> Company website
            </a>
          )}
        </Box>
        <Box>
          <LinkButton
            href="/suppliers/[id]/request"
            params={{ id }}
            size="lg"
            variantColor="blue"
            mt={{ base: "4", md: "0" }}
          >
            Request a quote from supplier
          </LinkButton>
        </Box>
      </Flex>

      <Text fontSize="30px" mt={{ base: "6", md: "12" }}>
        Products
      </Text>

      {Object.entries(productsList).map(([category, products]) => (
        <Box key={category} ml="6" mt={{ base: "2", md: "4" }}>
          <Text fontSize="25px" color="gray.700" mb="2">
            {category}
          </Text>
          <Flex wrap="wrap">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </Flex>
        </Box>
      ))}
    </>
  );
};

export default SupplierDetailPage;
