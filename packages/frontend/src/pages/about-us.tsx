import * as React from "react";
import SiteHero from "../components/SiteHero";
import { Heading, Text } from "@chakra-ui/core";
import { Box, Link } from "@chakra-ui/core/dist";
import SimpleGrid from "@chakra-ui/core/dist/SimpleGrid";
import { NextPage } from "next";
import Card from "../components/chakra/Card";

type Member = {
  title: string;
  description: string;
  role: string;
  linkedIn: string;
  web: string;
  imageSrc: string;
};

const AboutUs: NextPage<{ team: Member[] }> = ({ team }) => {
  return (
    <>
      <SiteHero
        title="About Us"
        description="A non-profit registry for sourcing protective masks in Europe"
      />

      <Box maxWidth="800px" mx="auto" textAlign="center">
        <Box mb="16">
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={5}>
            {team.map((member) => (
              <Card key={member.title} textAlign="center" p="4">
                <Heading as="h4" size="sm">
                  {member.title}
                </Heading>
                <Text fontSize="sm" color="#495057" mb="2">
                  {member.role}
                </Text>
                <Box textAlign="center">
                  {member.imageSrc ? (
                    <img
                      src={`${member.imageSrc}.jpg`}
                      srcSet={`${member.imageSrc}@2x.jpg 2x`}
                      alt={member.title}
                      height="150"
                      width="150"
                      style={{ borderRadius: "50%", display: "inline-block" }}
                    />
                  ) : (
                    <img
                      src="/images/mask.svg"
                      alt={member.title}
                      height="150"
                      width="150"
                      style={{ display: "inline-block", padding: "16px" }}
                    />
                  )}
                </Box>
                <Link
                  fontSize="xs"
                  href={member.linkedIn}
                  target="_blank"
                  px={1}
                >
                  LinkedIn
                </Link>
                {member.web && (
                  <Link fontSize="xs" href={member.web} target="_blank" px={1}>
                    Web
                  </Link>
                )}
              </Card>
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
      linkedIn: "https://www.linkedin.com/in/firatoezcan",
      imageSrc: "",
    },
    {
      title: "Hanna Hohenbild",
      description: "",
      role: "Project Assistant",
      linkedIn: "https://www.linkedin.com/in/firatoezcan",
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
