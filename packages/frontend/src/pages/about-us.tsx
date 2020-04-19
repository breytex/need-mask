import * as React from "react";
import { Heading, Text, Flex, Button } from "@chakra-ui/core";
import PageHead from "../components/PageHead";
import { Box } from "@chakra-ui/core/dist";
import SimpleGrid from "@chakra-ui/core/dist/SimpleGrid";
import { NextPage } from "next";
import TeamMember, { Member } from "../components/TeamMember";

const AboutUs: NextPage<{ team: Member[] }> = ({ team }) => {
  return (
    <>
      <PageHead title="About us" />
      <Box maxWidth="800px" mx="auto">
        <Box textAlign="left">
          <Heading>About us</Heading>
          <Text mt="2">
            A non-profit registry for sourcing protective masks in Europe In
            recent days the request for medical masks and protective wear across
            Europe has risen due to the spread of COVID-19. We want to help to
            provide an overview of current NEED and SUPPLY of protective wear,
            especially face masks.
          </Text>
        </Box>
        <Box mb="16" mt="10" textAlign="center">
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={5}>
            {team.map((member) => (
              <TeamMember key={member.title} {...member} />
            ))}
          </SimpleGrid>
          <Flex justify="center">
            <Text fontWeight="bold">Advisor:</Text>
            <Text ml="1">Jan Wilmking </Text>
          </Flex>
        </Box>
        <Box textAlign="left">
          <Heading mt="4">Our story</Heading>
          <Text mt="2">
            David founded need-mask.com in late March 2020 in Aachen, Germany.
            At first, David matched suppliers and buyers by mail and phone.
            Fabian and his two friends Firat and Arne joined and built a
            fully-fledged listing platform in their free time. Now buyers and
            suppliers can finally find each other without a middleman.
            Need-mask.com is ready to be scaled worldwide. Now it‘s up to you:
            Spread the word, send us feedback, make it work!
          </Text>
          <Heading mt="8">Want to help?</Heading>
          <Text mt="2">
            We are always seeking new team members who are willing to support in
            design, UX, marketing, software development, sales or other
            specialties with domain knowledge. We are also looking for financial
            support to grow the platform as a non-profit to the market leader of
            fighting bottlenecks in the protection gear supply chain. If you
            want to help or know someone who should get in touch with us:
          </Text>
          <Box mt="4">
            <a href="mailto:support@need-mask.com">
              <Button variantColor="blue">Send us a mail</Button>
            </a>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export async function getServerSideProps() {
  const team = [
    {
      title: "Dr.-Ing. David Schmelzeisen",
      description: "",
      role: "Project Lead",
      linkedIn: "https://www.linkedin.com/in/david-schmelzeisen/",
      imageSrc: "/images/team/ds",
    },
    {
      title: "Arne Wiese",
      description: "",
      role: "Freelance Software Engineer",
      linkedIn: "https://www.linkedin.com/in/arnewiese/",
      imageSrc: "/images/team/aw",
    },
    {
      title: "Fabian Schulze",
      description: "",
      role: "Freelance Software Engineer",
      linkedIn: "https://www.linkedin.com/in/fabian-schulze-code-consulting/",
      web: "http://code-consulting.de",
      imageSrc: "/images/team/fs",
    },
    {
      title: "Firat Özcan",
      description: "",
      role: "Freelance Software Engineer",
      linkedIn: "https://www.linkedin.com/in/firatoezcan",
      imageSrc: "/images/team/fo",
    },
    {
      title: "Kira Hirschberger",
      description: "",
      role: "Project Assistant",
      linkedIn: "",
      imageSrc: "",
    },
    {
      title: "Hanna Hohenbild",
      description: "",
      role: "Project Assistant",
      linkedIn: "",
      imageSrc: "",
    },
  ];

  return {
    props: {
      team: [
        team[0],
        ...team.slice(1, team.length).sort(() => Math.random() - 0.5),
      ],
    },
  };
}

export default AboutUs;
