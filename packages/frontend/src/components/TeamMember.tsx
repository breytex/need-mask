import * as React from "react";
import { Box, Text, Heading, Link, Icon } from "@chakra-ui/core/dist";
import Card from "./chakra/Card";
import Flex from "@chakra-ui/core/dist/Flex";

export type Member = {
  title: string;
  description: string;
  role: string;
  linkedIn: string;
  web: string;
  imageSrc: string;
  xing: string;
};

type Props = Member;

export const TeamMember: React.FC<Props> = (props) => {
  const { imageSrc, role, web, title, linkedIn, xing } = props;
  return (
    <Card key={title} textAlign="center" p="4">
      <Heading as="h4" size="sm" mb="1">
        {title}
      </Heading>
      <Text fontSize="sm" color="#495057" mb="4">
        {role}
      </Text>
      <Box textAlign="center" mb="4">
        {imageSrc ? (
          <img
            src={`${imageSrc}.jpg`}
            srcSet={`${imageSrc}@2x.jpg 2x`}
            alt={title}
            height="150"
            width="150"
            style={{ borderRadius: "50%", display: "inline-block" }}
          />
        ) : (
          <img
            src="/images/mask.svg"
            alt={title}
            height="150"
            width="150"
            style={{ display: "inline-block", padding: "16px" }}
          />
        )}
      </Box>
      <Flex justifyContent="center" alignItems="center">
        {linkedIn && (
          <Link
            fontSize="xs"
            href={linkedIn}
            target="_blank"
            px={1}
            display="inline-block"
          >
            <Icon name="linkedin" fontSize="2xl" />
          </Link>
        )}
        {xing && (
          <Link
            fontSize="xs"
            href={xing}
            target="_blank"
            px={1}
            display="inline-block"
          >
            <Icon name="xing" fontSize="2xl" />
          </Link>
        )}
        {web && (
          <Link
            fontSize="xs"
            href={web}
            target="_blank"
            px={1}
            display="inline-block"
          >
            <Icon name="external-link" fontSize="2xl" />
          </Link>
        )}
      </Flex>
    </Card>
  );
};

export default TeamMember;
