import React, { useMemo } from "react";
import { NextPage, NextPageContext } from "next";
import { Supplier } from "../../../types/Supplier";
import { GET_SUPPLIER_FN_WITH_PRODUCTS } from "../../../graphql/queries/supplier";
import {
  Flex,
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from "@chakra-ui/core/dist";

import Link from "next/link";

import { redirect } from "../../../helpers/redirect";
import { graphQuery } from "../../../graphql/graphQuery";

import PageTitle from "../../../components/chakra/PageTitle";
import LinkButton from "../../../components/chakra/LinkButton";
import { Product } from "../../../types/Product";
import ProductCard from "./ProductCard";
type Props = {
  id: string;
  supplier: Supplier;
};

interface ProductListType {
  Mask?: Product[];
  Clothing?: Product[];
  Headgear?: Product[];
}

const SupplierDetailPage: NextPage<{ props: Props }> = ({ props }) => {
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
            <a href={realWebAddress} target="_blank">
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
              <ProductCard {...p} />
            ))}
          </Flex>
        </Box>
      ))}
    </>
  );
};

SupplierDetailPage.getInitialProps = async (context: NextPageContext) => {
  const { query } = context;
  const id = query.id as string;

  const { data } = await graphQuery(GET_SUPPLIER_FN_WITH_PRODUCTS(id));

  if (!data || !data.suppliers_by_pk) {
    redirect(context, "/suppliers");
  }

  return {
    props: {
      id,
      supplier: data.suppliers_by_pk,
    },
  };
};

export default SupplierDetailPage;
