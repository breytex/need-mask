import * as React from "react";
import { NextPage, NextPageContext } from "next";
import { Supplier } from "../../../types/Supplier";
import { GET_SUPPLIER_FN_WITH_PRODUCTS } from "../../../graphql/queries/supplier";
import {
  Image,
  SimpleGrid,
  Flex,
  Box,
  Heading,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Button,
} from "@chakra-ui/core/dist";

import Link from "next/link";

import { useRouter } from "next/router";
import { redirect } from "../../../helpers/redirect";
import { graphQuery } from "../../../graphql/graphQuery";
import SemiBoldTitle from "../../../components/chakra/SemiBoldTitle";
import { getProductIconUrl } from "../../../helpers/getProductIcon";

type Props = {
  id: string;
  supplier: Supplier;
};

const SupplierDetailPage: NextPage<{ props: Props }> = ({ props }) => {
  const router = useRouter();
  const { supplier } = props;

  return (
    <>
      <Box mb={4}>
        <Breadcrumb fontSize="sm" mb="4">
          <BreadcrumbItem>
            <Link href="/suppliers">
              <BreadcrumbLink>Suppliers</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">{supplier.companyName}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Box width="375px">
          <Text>
            {supplier.city}, {supplier.country}, {supplier.continent}
          </Text>
          <Heading fontWeight="semibold" as="h1" size="lg">
            {supplier.companyName}
          </Heading>
        </Box>
      </Box>

      <Divider my={8} />

      <SemiBoldTitle>Available Products</SemiBoldTitle>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={8}>
        {supplier.products.map(
          ({
            capacity,
            description,
            id,
            leadTime,
            maxPrice,
            minOrderAmount,
            minPrice,
            productType,
            title,
          }) => {
            return (
              <Flex key={id}>
                <Box mr={2} width="100px">
                  <Image
                    src={getProductIconUrl(title, productType.title)}
                    alt=""
                    width="100"
                    height="100"
                  />
                </Box>
                <Box flex="1" px={2}>
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                  >
                    {capacity} Units &bull;
                    {!minOrderAmount ? " No Min" : " " + minOrderAmount} MOQ
                  </Box>
                  <Text fontSize="sm">{productType.title}</Text>
                  <Heading as="h3" size="sm">
                    {title}
                  </Heading>
                  {description && <Text>description: {description}</Text>}
                  {capacity > 0 && <Text>{capacity} Units</Text>}
                  {leadTime > 0 && (
                    <Text>Shipping time in {leadTime} days</Text>
                  )}
                  {minPrice > 0 ||
                    (maxPrice > 0 && (
                      <Box>
                        {minPrice / 1000} EUR to {maxPrice / 1000} EUR
                      </Box>
                    ))}
                </Box>
              </Flex>
            );
          }
        )}
      </SimpleGrid>

      <Divider my={8} />

      <Box maxWidth="500px" mx="auto" textAlign="center">
        <SemiBoldTitle>
          Get the products you need and share your company information for a
          quote
        </SemiBoldTitle>
        <Button
          onClick={() =>
            router.push(`/suppliers/[id]/request`, `${router.asPath}/request`)
          }
        >
          Request product information
        </Button>
      </Box>
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
