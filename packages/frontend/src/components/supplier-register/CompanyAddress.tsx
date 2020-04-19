import React, { useState, useEffect } from "react";
import { Field } from "../chakra/form/Field";
import { Input, Select, Link, Box, Text, Checkbox } from "@chakra-ui/core";
import { FieldRow } from "../chakra/form/FieldRow";
import { get } from "lodash";
import { countries } from "../../types/Geographic";
import styled from "@emotion/styled";
import AlgoliaPlaces from "algolia-places-react";
import { useFormContext } from "react-hook-form";
import Error from "../chakra/form/Error";
import { PrivacyCheckboxText } from "../privacyCheckboxes";

interface Props {
  skipAlgolia?: boolean;
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

export const ADDRESS_BLOCKER_FIELD_NAME = "addressBlocker";

export const CompanyAddress = (props: Props) => {
  const { skipAlgolia } = props;
  const { register, errors, setValue } = useFormContext();
  const [hasSearched, setHasSearched] = useState(skipAlgolia);

  useEffect(() => {
    if (skipAlgolia) return;
    register({ name: ADDRESS_BLOCKER_FIELD_NAME }, { required: true });
  }, []);

  const onAlgoliaChanged = ({ suggestion }) => {
    triggerCompanyAddress();
    setValue("city", get(suggestion, "city", ""));
    setValue("country", get(suggestion, "countryCode", "").toUpperCase());
    setValue("zip", get(suggestion, "postcode", ""));
    setValue("street", get(suggestion, "name", ""));
  };

  const triggerCompanyAddress = () => {
    setValue(ADDRESS_BLOCKER_FIELD_NAME, "true");
    setHasSearched(true);
  };

  return (
    <React.Fragment>
      {!hasSearched && (
        <React.Fragment>
          <input
            style={{ display: "none" }}
            type="text"
            name="address"
            autoComplete="street-address"
          />
          <AlgoliaFix>
            <AlgoliaPlaces
              placeholder="Write your company address here..."
              options={{
                appId: process.env.ALGOLIA_PLACES_APPID,
                apiKey: process.env.ALGOLIA_PLACES_KEY,
                language: "en",
                type: "address",
                // Other options from https://community.algolia.com/places/documentation.html#options
              }}
              onChange={onAlgoliaChanged}
              onError={triggerCompanyAddress}
            />
          </AlgoliaFix>
          {errors[ADDRESS_BLOCKER_FIELD_NAME] && (
            <Error>Please enter a company address</Error>
          )}
          <Box mt="4">
            <Link onClick={triggerCompanyAddress} mt="1" color="gray.700">
              Enter address manually
            </Link>
          </Box>
        </React.Fragment>
      )}
      {hasSearched && (
        <React.Fragment>
          <FieldRow>
            <Field name="street" label="Street" flexGrow={4} isRequired>
              <Input
                name="street"
                maxLength={254}
                ref={register({ required: true })}
              />
            </Field>
            <Field name="houseNumber" label="Number" flexGrow={1} isRequired>
              <Input
                name="houseNumber"
                maxLength={25}
                ref={register({
                  required: true,
                })}
              />
            </Field>
          </FieldRow>
          <FieldRow>
            <Field name="city" label="City" flexGrow={4} isRequired>
              <Input
                name="city"
                maxLength={254}
                ref={register({ required: true })}
              />
            </Field>
            <Field name="zip" label="ZIP" flexGrow={1}>
              <Input
                name="zip"
                maxLength={15}
                ref={register({ required: true })}
              />
            </Field>
          </FieldRow>
          <Field name="country" label="Country" flexGrow={1} isRequired>
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
      <Field name="privacy" mt="8">
        <Checkbox name="privacy" ref={register({ required: true })}>
          <PrivacyCheckboxText />
        </Checkbox>
      </Field>
    </React.Fragment>
  );
};
