import React from "react";
import PageTitle from "../chakra/PageTitle";
import { Text, Icon, Box } from "@chakra-ui/core";
import { countries } from "../../types/Geographic";

interface Props {
  companyName: string;
  city: string;
  country: string;
  web?: string;
  mt?: string;
  mb?: string;
}

const SupplierHeader = ({ companyName, city, country, web, mt, mb }: Props) => {
  const countryString =
    countries.find((c) => c.code === country)?.name || country;

  const realWebAddress = web?.includes("http") ? web : `https://${web}`;

  return (
    <Box mt={mt} mb={mb}>
      <PageTitle mb="0">{companyName}</PageTitle>
      <Text fontSize="25px" mt="-8px" color="gray.700">
        {city}, {countryString}
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
  );
};

export default SupplierHeader;
