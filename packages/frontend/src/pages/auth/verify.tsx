import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import SiteHero from "../../components/SiteHero";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Flex,
  Button,
} from "@chakra-ui/core";
import { usePost } from "../../hooks/usePost";
import { Spinner } from "../../components/chakra/Spinner";
import { useRouter } from "next/router";
import Error from "../../components/chakra/form/Error";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import queryString from "query-string";
import PageHead from "../../components/PageHead";

type Props = NextPage;

const Verify: Props = (props) => {
  const [code, setCode] = useState("");
  const { trigger, isLoading, data, error, setError } = usePost(
    "/api/auth/verify"
  );
  const [_, setAccessToken] = useLocalStorage("accessToken", {});
  const router = useRouter();
  const { email, supplierId } = router.query;

  const checkResponse = async (data) => {
    if (data.status !== 200) {
      const response = await data.text();
      setError(response);
      return;
    }
    const response = await data.json();
    setAccessToken(response.jwt);
    const params = queryString.stringify({ supplierId });
    router.push(`/suppliers/edit?${params}`);
  };

  useEffect(() => {
    if (!data) return;
    checkResponse(data);
  }, [data]);

  const onLoginClicked = async () => {
    await trigger({ code, email });
  };

  return (
    <>
      <PageHead title="Login: check your mails" />
      <SiteHero
        title="Check your emails!"
        description="We just sent you an email including a security pin. Enter it below to finish the login process."
      />
      <Flex justify="center">
        <InputGroup size="lg">
          <InputLeftElement children={<Icon name="lock" color="gray.500" />} />
          <Input
            type="text"
            placeholder="Enter pin code..."
            w="300px"
            onChange={(event) => setCode(event.target.value)}
            isDisabled={isLoading}
          />
        </InputGroup>
        <Button
          isLoading={isLoading}
          size="lg"
          variantColor="blue"
          ml="2"
          onClick={onLoginClicked}
        >
          Login
        </Button>
      </Flex>
      <Flex justify="center" h="40px">
        {error && <Error mx="auto">{error}</Error>}
      </Flex>
    </>
  );
};

export default Verify;
