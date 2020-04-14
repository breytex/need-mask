import * as React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/core/dist";
import { getProductIconUrl } from "../helpers/getProductIcon";
import { Product } from "../types/Product";

type Props = {
  product: Product;
};

export const SupplierProduct: React.FC<Props> = (props) => {
  const {
    capacity,
    description,
    id,
    leadTime,
    maxPrice,
    minOrderAmount,
    minPrice,
    productType,
    title,
    files,
  } = props.product;

  const hasImages = files?.length > 0;

  return (
    <Flex mb={8}>
      <Box mr={2} width="100px">
        {hasImages ? (
          files.map((file) => (
            <Box key={file.id} mb="2">
              <a href={file.file.url} target="_blank">
                <img src={file.file.url} alt="" />
              </a>
            </Box>
          ))
        ) : (
          <img
            src={getProductIconUrl(title, productType?.title)}
            alt=""
            width="100"
            height="100"
          />
        )}
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
        {leadTime > 0 && <Text>Shipping time in {leadTime} days</Text>}
        {minPrice > 0 ||
          (maxPrice > 0 && (
            <Box>
              {minPrice / 1000} EUR to {maxPrice / 1000} EUR
            </Box>
          ))}
      </Box>
    </Flex>
  );
};

export default SupplierProduct;
