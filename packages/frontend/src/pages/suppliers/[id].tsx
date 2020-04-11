import * as React from "react";
import { NextPage } from "next";
import { Supplier } from "../../types/Supplier";
import { GET_SUPPLIER_FN_WITH_PRODUCTS } from "../../graphql/queries/supplier";
import { NextUrqlPageContext, withUrqlClient } from "next-urql";
import { urqlConfig } from "../../graphql/urqlConfig";
import { Flex, Box, Heading, Text } from "@chakra-ui/core/dist";
import format from "date-fns/format";

const SupplierDetailPage: NextPage<{
  props: { supplier: Supplier };
}> = ({ props }) => {
  const { supplier } = props;

  return (
    <>
      <Flex mb={8}>
        <Box mr={2}>
          <img src="https://source.unsplash.com/200x200?medical" alt="" />
        </Box>
        <Box flex={1} ml={2}>
          <Text>
            {supplier.city}, {supplier.country}
          </Text>
          <Heading fontWeight="normal" as="h1" size="lg">
            {supplier.companyName}
          </Heading>
        </Box>
      </Flex>

      <Heading fontWeight="600" size="lg" mb={16} textAlign="center">
        Available Products
      </Heading>

      <Flex flexWrap="wrap">
        {supplier.products.map((product) => {
          const createdAt = format(new Date(product.createdAt), "yyyy-mm-dd");
          const updatedAt = format(new Date(product.updatedAt), "yyyy-mm-dd");
          const wasUpdated = createdAt !== updatedAt;

          return (
            <Flex key={product.id} mb={4} width="33%">
              <Box mr={2} width="100px">
                <img
                  src={`https://source.unsplash.com/100x100?${product.productType.title}`}
                  alt=""
                  width="100"
                  height="100"
                />
                <Box>
                  <Text fontSize="sm">Listed Since {createdAt}</Text>
                  {wasUpdated && (
                    <Text fontSize="sm">updatedAt {updatedAt}</Text>
                  )}
                </Box>
              </Box>
              <Box flex="1" ml={2}>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                >
                  {product.capacity} Units &bull;
                  {product.minOrderAmount === 0
                    ? " No Min"
                    : " " + product.minOrderAmount}{" "}
                  MOQ
                </Box>
                <Text fontSize="sm">{product.productType.title}</Text>
                <Heading as="h3" size="sm">
                  {product.title}
                </Heading>
                {product.description && (
                  <Text>description: {product.description}</Text>
                )}

                <Text>Delivery in {product.leadTime} Days</Text>
                <Text>
                  <Box>
                    {product.minPrice / 1000} EUR to {product.maxPrice / 1000}{" "}
                    EUR
                  </Box>
                </Text>
                {product.unit && <Text>unit: {product.unit}</Text>}
              </Box>
            </Flex>
          );
        })}
      </Flex>
    </>
  );
};

SupplierDetailPage.getInitialProps = async (context: NextUrqlPageContext) => {
  const { query, urqlClient } = context;
  const id = query.id as string;
  const { data } = await urqlClient
    .query(GET_SUPPLIER_FN_WITH_PRODUCTS(id))
    .toPromise();

  return {
    props: {
      supplier: data.suppliers_by_pk,
    },
  };
};

export default withUrqlClient(urqlConfig)(SupplierDetailPage);
