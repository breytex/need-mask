import * as React from "react";
import { NextPage } from "next";
import { Supplier } from "../../../types/Supplier";
import { GET_SUPPLIER_FN_WITH_PRODUCTS } from "../../../graphql/queries/supplier";
import { NextUrqlPageContext, withUrqlClient } from "next-urql";
import { urqlConfig } from "../../../graphql/urqlConfig";
import {
  SimpleGrid,
  Image,
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

type Props = {
  id: string;
  supplier: Supplier;
};

const SupplierDetailPage: NextPage<{ props: Props }> = ({ props }) => {
  const router = useRouter();
  const { supplier } = props;

  return (
    <>
      <Box mb={16}>
        <Breadcrumb fontSize="sm">
          <BreadcrumbItem>
            <Link href="/suppliers">
              <BreadcrumbLink>Suppliers</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">{supplier.companyName}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Box mr={4} mx="auto" mb="2">
          <Image
            src="https://source.unsplash.com/100x100?medical"
            size="100px"
            mx="auto"
          />
        </Box>
        <Box flex={1} ml={4} width="375px" mx="auto" textAlign="center">
          <Text>
            {supplier.city}, {supplier.country}, {supplier.continent}
          </Text>
          <Heading fontWeight="normal" as="h1" size="lg">
            {supplier.companyName}
          </Heading>
        </Box>
      </Box>

      <Heading fontWeight="600" size="lg" mb={12} textAlign="center">
        Available Products
      </Heading>

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
                  <img
                    src={`https://source.unsplash.com/100x100?${productType.title}`}
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
                    {minOrderAmount === 0
                      ? " No Min"
                      : " " + minOrderAmount}{" "}
                    MOQ
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

SupplierDetailPage.getInitialProps = async (context: NextUrqlPageContext) => {
  const { query, urqlClient } = context;
  const id = query.id as string;
  const { data } = await urqlClient
    .query(GET_SUPPLIER_FN_WITH_PRODUCTS(id))
    .toPromise();

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

export default withUrqlClient(urqlConfig())(SupplierDetailPage);
