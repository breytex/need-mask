import * as React from "react";
import SiteHero from "../components/SiteHero";
import { Heading, Text } from "@chakra-ui/core";

const AboutUs = () => {
  let div = (
    <>
      <div>
        <SiteHero
          title="About Us"
          description="A non-profit registry for sourcing protective masks in Europe"
        />
        <Heading size="md">Coordinated by</Heading>
        <Text>Dr.-Ing. David Schmelzeisen</Text>
        <Text>Jan Wilmking</Text>
        <Text>Jürgen Brocker</Text>
      </div>
    </>
  );
  return div;
};

export default AboutUs;
