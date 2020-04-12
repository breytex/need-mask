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

type Props = NextPage;

const Login: Props = (props) => {
  const [email, setEmail] = useState("");
  const { trigger, isLoading, data, error, setError } = usePost(
    "/api/auth/request"
  );
  const router = useRouter();

  const checkResponse = async (data) => {
    if (data.status !== 200) {
      const response = await data.text();
      setError(response);
      return;
    }
    router.push(`/auth/verify?email=${email}`);
  };

  useEffect(() => {
    if (!data) return;
    checkResponse(data);
  }, [data]);

  const onLoginClicked = async () => {
    await trigger({ email });
  };

  return (
    <>
      <SiteHero title="Login" description="Change your supplier listing" />
      <Flex justify="center">
        <InputGroup size="lg">
          <InputLeftElement children={<Icon name="email" color="gray.500" />} />
          <Input
            type="text"
            placeholder="Your E-Mail"
            w="300px"
            onChange={(event) => setEmail(event.target.value)}
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

export default Login;
