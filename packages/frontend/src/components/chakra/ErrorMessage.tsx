import React, { ReactElement, useState, useEffect, ReactNode } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  BoxProps,
} from "@chakra-ui/core";

interface Props extends BoxProps {
  show: boolean;
  title: string;
  children: ReactNode;
}

export function ErrorMessage({
  title,
  children,
  show = true,
  ...rest
}: Props): ReactElement {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(show), [show]);

  if (!isVisible) return null;
  return (
    <Alert status="error" {...rest}>
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => setIsVisible(false)}
      />
    </Alert>
  );
}
