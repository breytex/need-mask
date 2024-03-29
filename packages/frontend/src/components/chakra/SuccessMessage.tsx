import React from "react";
import { Flex, Text, Heading, Button } from "@chakra-ui/core";
import { useRouter } from "next/router";

interface Props {
  title: string;
  children: string;
  buttonTitle?: string;
  onClickPath?: string;
  bigWarning?: string;
}

const SuccessMessage = ({
  title,
  children,
  onClickPath,
  buttonTitle,
  bigWarning,
}: Props) => {
  const router = useRouter();
  return (
    <Flex alignItems="center" flexDirection="column" pt="20%" px="4">
      <Heading color="blue.700">{title}</Heading>
      <Text textAlign="center" maxW="600px" fontSize="lg" mt={"4"}>
        {children}
      </Text>
      {bigWarning && (
        <Text fontSize="xl" fontWeight="600" mt="4">
          {bigWarning}
        </Text>
      )}
      {buttonTitle && onClickPath && (
        <Button
          onClick={() => router.push(onClickPath)}
          mt="4"
          variant="outline"
          variantColor="blue"
        >
          {buttonTitle}
        </Button>
      )}
    </Flex>
  );
};

export default SuccessMessage;
