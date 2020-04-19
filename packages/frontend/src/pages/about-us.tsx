import * as React from "react";
import { Heading, Text } from "@chakra-ui/core";
import PageHead from "../components/PageHead";
import { Box } from "@chakra-ui/core/dist";
import SimpleGrid from "@chakra-ui/core/dist/SimpleGrid";
import { NextPage } from "next";
import TeamMember, { Member } from "../components/TeamMember";

const AboutUs: NextPage<{ team: Member[] }> = ({ team }) => {
  return (
    <>
      <PageHead title="About us" />
      <Box maxWidth="800px" mx="auto" textAlign="center">
        <Box mb="16">
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={5}>
            {team.map((member) => (
              <TeamMember key={member.title} {...member} />
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb="4">
            Advisor
          </Heading>
          <Text mb="2">Jan Wilmking</Text>
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
