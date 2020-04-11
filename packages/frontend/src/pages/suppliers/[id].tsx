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
      <Flex
        mb={16}
        flexDirection={{ base: "column", md: "row" }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Box mr={4} mx="auto" mb={{ base: 2, md: 0 }}>
          <img
            src="https://source.unsplash.com/200x200?medical"
            width="200"
            height="200"
            alt=""
          />
        </Box>
        <Box flex={1} ml={4}>
          <Text>
            {supplier.city}, {supplier.country}
          </Text>
          <Heading fontWeight="normal" as="h1" size="lg">
            {supplier.companyName}
          </Heading>
          <Heading fontWeight="normal" as="h1" size="lg">
            Offers {supplier.products.length} Products
          </Heading>
        </Box>
      </Flex>

      <Heading fontWeight="600" size="lg" mb={16} textAlign="center">
        Available Products
      </Heading>

      <Flex flexWrap="wrap" flexDirection={{ base: "column", md: "row" }}>
        {supplier.products.map(
          ({
            capacity,
            createdAt,
            description,
            id,
            leadTime,
            maxPrice,
            minOrderAmount,
            minPrice,
            productType: { title: title1 },
            title,
            unit,
            updatedAt,
          }) => {
            const createdAtDate = format(new Date(createdAt), "yyyy-mm-dd");
            const updatedAtDate = format(new Date(updatedAt), "yyyy-mm-dd");
            const wasUpdated = createdAtDate !== updatedAtDate;

            return (
              <Flex key={id} mb={4} width={{ base: "100%", md: "33%" }}>
                <Box mr={2} width="100px">
                  <img
                    src={`https://source.unsplash.com/100x100?${title1}`}
                    alt=""
                    width="100"
                    height="100"
                  />
                  <Box>
                    <Text fontSize="sm">Listed Since {createdAtDate}</Text>
                    {wasUpdated && (
                      <Text fontSize="sm">updatedAt {updatedAtDate}</Text>
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
                    {capacity} Units &bull;
                    {minOrderAmount === 0
                      ? " No Min"
                      : " " + minOrderAmount}{" "}
                    MOQ
                  </Box>
                  <Text fontSize="sm">{title1}</Text>
                  <Heading as="h3" size="sm">
                    {title}
                  </Heading>
                  {description && <Text>description: {description}</Text>}

                  <Text>Delivery in {leadTime} Days</Text>

                  <Box>
                    {minPrice / 1000} EUR to {maxPrice / 1000} EUR
                  </Box>

                  {unit && <Text>unit: {unit}</Text>}
                </Box>
              </Flex>
            );
          }
        )}
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
