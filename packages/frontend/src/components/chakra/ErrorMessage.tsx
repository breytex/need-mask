import React, { ReactElement, useState, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/core";

interface Props {
  show: boolean;
  title: string;
  children: string;
}

export function ErrorMessage({ title, children, show }: Props): ReactElement {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(show), [show]);

  if (!isVisible) return null;
  return (
    <Alert status="error">
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
