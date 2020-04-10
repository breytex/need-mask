import * as React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Button } from "@chakra-ui/core";

const Home: NextPage = () => (
  <div>
    <Link href="/listings/1">
      <Button>test</Button>
    </Link>
  </div>
);

export default Home;
