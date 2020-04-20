import * as React from "react";
import { Box, Text, Heading, Link } from "@chakra-ui/core/dist";
import Card from "./chakra/Card";
import Flex from "@chakra-ui/core/dist/Flex";

export type Member = {
  title: string;
  description: string;
  role: string;
  linkedIn: string;
  web: string;
  imageSrc: string;
};

type Props = Member;

export const TeamMember: React.FC<Props> = (props) => {
  const { imageSrc, role, web, title, linkedIn } = props;
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
          <Box w="24px" h="24px">
            <Link
              fontSize="xs"
              href={linkedIn}
              target="_blank"
              px={1}
              display="inline-block"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1.5rem"
                width="1.5rem"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block" }}
              >
                <path d="M417.2 64H96.8C79.3 64 64 76.6 64 93.9V415c0 17.4 15.3 32.9 32.8 32.9h320.3c17.6 0 30.8-15.6 30.8-32.9V93.9C448 76.6 434.7 64 417.2 64zM183 384h-55V213h55v171zm-25.6-197h-.4c-17.6 0-29-13.1-29-29.5 0-16.7 11.7-29.5 29.7-29.5s29 12.7 29.4 29.5c0 16.4-11.4 29.5-29.7 29.5zM384 384h-55v-93.5c0-22.4-8-37.7-27.9-37.7-15.2 0-24.2 10.3-28.2 20.3-1.5 3.6-1.9 8.5-1.9 13.5V384h-55V213h55v23.8c8-11.4 20.5-27.8 49.6-27.8 36.1 0 63.4 23.8 63.4 75.1V384z"></path>
              </svg>
            </Link>
          </Box>
        )}
        {web && (
          <Box w="24px" h="24px">
            <Link
              fontSize="xs"
              href={web}
              target="_blank"
              px={1}
              display="inline-block"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 12 16"
                height="1.35rem"
                width="1.35rem"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block" }}
              >
                <path
                  fillRule="evenodd"
                  d="M11 10h1v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h3v1H1v10h10v-3zM6 2l2.25 2.25L5 7.5 6.5 9l3.25-3.25L12 8V2H6z"
                ></path>
              </svg>
            </Link>
          </Box>
        )}
      </Flex>
    </Card>
  );
};

export default TeamMember;
