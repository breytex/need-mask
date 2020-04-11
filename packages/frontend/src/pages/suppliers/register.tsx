import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Flex,
  Text,
  Select,
  Link,
} from "@chakra-ui/core";
import { get } from "lodash";
import { useForm } from "react-hook-form";
import AlgoliaPlaces from "algolia-places-react";
import { Field } from "../../components/chakra/form/Field";
import { FieldRow } from "../../components/chakra/form/FieldRow";
import { countries } from "../../types/countries";

const Register: NextPage = () => {
  const { handleSubmit, errors, register, setValue } = useForm();
  const formControls = { errors, register };
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    register({ name: "blocker" }, { required: true });
  }, []);

  const onSubmit = (data) => {
    console.log({ data });
  };

  const triggerCompanyAddress = () => {
    setValue("blocker", "true");
    setHasSearched(true);
  };

  const onAlgoliaChanged = ({ suggestion }) => {
    triggerCompanyAddress();
    setValue("city", get(suggestion, "city", ""));
    setValue("country", get(suggestion, "countryCode", "").toUpperCase());
    setValue("zip", get(suggestion, "postcode", ""));
    setValue("street", get(suggestion, "name", ""));
  };

  return (
    <Box shadow="sm" bg="white" p="6" maxW="800px" mx="auto">
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text fontSize="25px" mt="10" mb="6">
            Contact details
          </Text>
          <Field name="companyName" label="Company name" errors={errors}>
            <Input
              name="companyName"
              ref={register({ required: true, pattern: /.{3}/ })}
            />
          </Field>
          <FieldRow mt="6">
            <Field
              name="firstName"
              label="Firstname"
              flexGrow={1}
              errors={errors}
            >
              <Input
                name="firstName"
                ref={register({ required: true, pattern: /.{3}/ })}
              />
            </Field>
            <Field
              name="lastName"
              label="Lastname"
              flexGrow={1}
              errors={errors}
            >
              <Input
                name="lastName"
                ref={register({ required: true, pattern: /.{3}/ })}
              />
            </Field>
          </FieldRow>
          <Field name="email" label="E-Mail" errors={errors}>
            <Input
              name="email"
              ref={register({ required: true, pattern: /.{3}/ })}
            />
          </Field>

          <Text fontSize="25px" mt="10" mb="6">
            Company address
          </Text>
          {!hasSearched && (
            <React.Fragment>
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
                <Field
                  name="street"
                  label="Street"
                  flexGrow={4}
                  errors={errors}
                >
                  <Input
                    name="street"
                    ref={register({ required: true, pattern: /.{3}/ })}
                  />
                </Field>
                <Field
                  name="number"
                  label="Number"
                  flexGrow={1}
                  errors={errors}
                >
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
              <Field
                name="country"
                label="Country"
                flexGrow={1}
                errors={errors}
              >
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
          <Box>
            <Button type="submit" mt="8">
              Send
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
{
  /* <AlgoliaPlaces
placeholder="Write an address here"
options={{
  appId: process.env.ALGOLIA_PLACES_APPID,
  apiKey: process.env.ALGOLIA_PLACES_KEY,
  language: "en",
  type: "address",
  // Other options from https://community.algolia.com/places/documentation.html#options
}}
onChange={({ query, rawAnswer, suggestion, suggestionIndex }) =>
  console.log({ query, rawAnswer, suggestion })
}
/> */
}
