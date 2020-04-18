import React, { useMemo } from "react";
import { Product, File } from "../../types/Product";
import Card from "../chakra/Card";
import { Heading, Box, Text, Flex } from "@chakra-ui/core";
import Zoom from "react-medium-image-zoom";
import { toPrice } from "../../helpers/functions";
import styled from "@emotion/styled";

const FixMarginBottom = styled(Box)`
  & > div {
    display: block;
  }
`;

const KeyValue = (props) => {
  const { label, value, available } = props;
  return (
    <Flex
      fontWeight="semibold"
      letterSpacing="wide"
      fontSize="14px"
      textTransform="uppercase"
    >
      <Text color="gray.700" w="140px">
        {label}:
      </Text>
      <Text color="gray.800">{available ? value : "N/A"}</Text>
    </Flex>
  );
};

const ProductImage = ({ url }: File) => (
  <FixMarginBottom
    border="1px solid"
    borderColor="gray.200"
    shadow="sm"
    mr="3"
    d="block"
  >
    <Zoom zoomMargin={100}>
      <img
        alt=""
        src={url}
        width="100"
        style={{ display: "block", verticalAlign: "middle" }}
      />
    </Zoom>
  </FixMarginBottom>
);

const ProductCard = (props: Product) => {
  const {
    title,
    leadTime,
    minPrice,
    maxPrice,
    minOrderAmount,
    capacity,
    files = [],
  } = props;

  const priceRange =
    minPrice === maxPrice
      ? `${toPrice(minPrice)}`
      : `${toPrice(minPrice)} - ${toPrice(maxPrice)}`;

  const fileTypes = useMemo(() => {
    let result = { images: [] as Array<File>, other: [] as Array<File> };

    files.forEach((f) => {
      if (f.file.fileKind === "certificateFile") {
        result.other.push(f.file);
      } else {
        result.images.push(f.file);
      }
    });
    return result;
  }, []);

  return (
    <Card
      p={{ base: "4", md: "6" }}
      mr="8"
      mb="8"
      minW={{ base: "300px", md: "350px" }}
    >
      <Heading size="lg" mb="2">
        {title}
      </Heading>
      <KeyValue
        label="Price range"
        value={priceRange}
        available={priceRange !== toPrice(0)}
      />
      <KeyValue
        label="Delivery time"
        value={`${leadTime} days`}
        available={Boolean(leadTime)}
      />
      <KeyValue
        label="Capacity"
        value={`${capacity} units/week`}
        available={Boolean(capacity)}
      />
      <KeyValue
        label="Min amount"
        value={`${minOrderAmount} units`}
        available={Boolean(minOrderAmount)}
      />

      {fileTypes.images.length > 0 && (
        <>
          <Text
            mt="6"
            color="gray.700"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="14px"
            textTransform="uppercase"
          >
            Product images
          </Text>
          <Flex mt="2" alignItems="flex-start">
            {fileTypes.images.map((f) => (
              <ProductImage {...f} />
            ))}
          </Flex>
        </>
      )}

      {fileTypes.other.length > 0 && (
        <>
          <Text
            mt="4"
            color="gray.700"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="14px"
            textTransform="uppercase"
          >
            Product specifications
          </Text>
          {fileTypes.other.map((f) => {
            const fileName = f.url.split("/").slice(-1)[0].split("--")[1];
            return (
              <a
                href={f.url}
                style={{ textDecoration: "underline" }}
                download={fileName}
                target="_blank"
              >
                Download "{fileName}"
              </a>
            );
          })}
        </>
      )}
    </Card>
  );
};

export default ProductCard;
