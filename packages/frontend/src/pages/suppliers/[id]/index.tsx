import * as React from "react";
import { NextPage, NextPageContext } from "next";
import { Supplier } from "../../../types/Supplier";
import { GET_SUPPLIER_FN_WITH_PRODUCTS } from "../../../graphql/queries/supplier";
import {
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
import SupplierProduct from "../../../components/SupplierProduct";

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

      {supplier.products.map((product) => (
        <SupplierProduct key={product.id} product={product} />
      ))}

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
