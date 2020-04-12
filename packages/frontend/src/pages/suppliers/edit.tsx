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

type Props = NextPage;

const Edit: Props = (props) => {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", {});
  const router = useRouter();

  useEffect(() => {
    const now = new Date().getTime();
    if (
      !accessToken ||
      !accessToken.jwt ||
      !accessToken.expire ||
      now > accessToken.expire
    ) {
      setAccessToken({});
      router.push("/auth/login");
    }
  }, []);

  return <>test</>;
};

export default Edit;
