import React, { useState } from "react";
import SectionTitle from "./SectionTitle";
import { Field } from "../chakra/form/Field";
import { Input, Select, Link, Box, Text } from "@chakra-ui/core";
import { FieldRow } from "../chakra/form/FieldRow";
import { get } from "lodash";
import { countries } from "../../types/countries";
import styled from "@emotion/styled";
import AlgoliaPlaces from "algolia-places-react";

interface Props {
  register: (obj) => (ref) => void;
  errors: any;
  setValue: (name, value) => void;
}

const AlgoliaFix = styled.div`
  .ap-suggestions svg {
    display: inline-block;
    vertical-align: baseline;
  }
  .algolia-places svg {
    display: inline-block;
    vertical-align: baseline;
  }
`;

export const CompanyAddress = (props: Props) => {
  const { register, errors, setValue } = props;
  const [hasSearched, setHasSearched] = useState(false);

  const onAlgoliaChanged = ({ suggestion }) => {
    triggerCompanyAddress();
    setValue("city", get(suggestion, "city", ""));
    setValue("country", get(suggestion, "countryCode", "").toUpperCase());
    setValue("zip", get(suggestion, "postcode", ""));
    setValue("street", get(suggestion, "name", ""));
  };

  const triggerCompanyAddress = () => {
    setValue("blocker", "true");
    setHasSearched(true);
  };

  return (
    <React.Fragment>
      <SectionTitle>Company address</SectionTitle>
      {!hasSearched && (
        <React.Fragment>
          <AlgoliaFix>
            <AlgoliaPlaces
              placeholder="Write an address here"
              options={{
                appId: process.env.ALGOLIA_PLACES_APPID,
                apiKey: process.env.ALGOLIA_PLACES_KEY,
                language: "en",
                type: "address",
                // Other options from https://community.algolia.com/places/documentation.html#options
              }}
              onChange={onAlgoliaChanged}
            />
          </AlgoliaFix>
          {errors["blocker"] && (
            <Text color="red.500" mt="1">
              Please enter a company address
            </Text>
          )}
          <Box mt="4">
            <Link onClick={triggerCompanyAddress} mt="2">
              (Enter address manually)
            </Link>
          </Box>
        </React.Fragment>
      )}
      {hasSearched && (
        <React.Fragment>
          <FieldRow>
            <Field name="street" label="Street" flexGrow={4} errors={errors}>
              <Input
                name="street"
                ref={register({ required: true, pattern: /.{3}/ })}
              />
            </Field>
            <Field name="number" label="Number" flexGrow={1} errors={errors}>
              <Input
                name="number"
                ref={register({ required: true, pattern: /.{3}/ })}
              />
            </Field>
          </FieldRow>
          <FieldRow>
            <Field name="city" label="City" flexGrow={4} errors={errors}>
              <Input
                name="city"
                ref={register({ required: true, pattern: /.{3}/ })}
              />
            </Field>
            <Field name="zip" label="ZIP" flexGrow={1} errors={errors}>
              <Input
                name="zip"
                ref={register({ required: true, pattern: /.{3}/ })}
              />
            </Field>
          </FieldRow>
          <Field name="country" label="Country" flexGrow={1} errors={errors}>
            <Select
              placeholder="Select option"
              name="country"
              ref={register({ required: true })}
            >
              {countries.map((country) => (
                <option value={country.code} key={country.code}>
                  {country.name}
                </option>
              ))}
            </Select>
          </Field>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
