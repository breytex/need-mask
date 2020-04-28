import React, { useMemo, useState } from "react";
import { Product, File } from "../../types/Product";
import Card from "../chakra/Card";
import { Heading, Box, Text, Flex, Button, Collapse } from "@chakra-ui/core";
import Zoom from "react-medium-image-zoom";
import { toPrice } from "../../helpers/functions";
import styled from "@emotion/styled";

const FixMarginBottom = styled(Box)`
  & > div {
    display: block;
  }
`;

const imageFileTypes = ["jpg", "jpeg", "png", "gif"];

const KeyText = ({ children }) => (
  <Text
    mt="4"
    color="gray.700"
    fontWeight="semibold"
    letterSpacing="wide"
    fontSize="14px"
    textTransform="uppercase"
  >
    {children}
  </Text>
);

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
    description,
    files = [],
  } = props;
  const [extendDescription, setExtendDescription] = useState(false);

  const priceRange =
    minPrice === maxPrice
      ? `${toPrice(minPrice)}`
      : `${toPrice(minPrice)} - ${toPrice(maxPrice)}`;

  const fileTypes = useMemo(() => {
    let result = { images: [] as Array<File>, other: [] as Array<File> };

    files.forEach((f) => {
      if (imageFileTypes.includes(f.file.fileType.toLowerCase())) {
        result.images.push(f.file);
      } else {
        result.other.push(f.file);
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
      maxW="500px"
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
        value={`${new Intl.NumberFormat("en-US").format(
          capacity || 0
        )} units/week`}
        available={Boolean(capacity)}
      />
      <KeyValue
        label="Min amount"
        value={`${new Intl.NumberFormat("en-US").format(
          minOrderAmount || 0
        )} units`}
        available={Boolean(minOrderAmount)}
      />
      {description && (
        <Box>
          <KeyText>Description:</KeyText>
          <Collapse
            ml="4"
            mt="1"
            startingHeight={50}
            isOpen={extendDescription}
          >
            {description}
          </Collapse>
          <Button
            mt="2"
            ml="3"
            size="xs"
            onClick={() => setExtendDescription((state) => !state)}
            variant="outline"
          >
            Show {extendDescription ? "Less" : "More"}
          </Button>
        </Box>
      )}

      {fileTypes.images.length > 0 && (
        <>
          <KeyText>Product images</KeyText>
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
              <Flex>
                <a href={f.url} download={fileName} target="_blank">
                  <Button leftIcon="download" variant="ghost">
                    {fileName}
                  </Button>
                </a>
              </Flex>
            );
          })}
        </>
      )}
    </Card>
  );
};

export default ProductCard;
