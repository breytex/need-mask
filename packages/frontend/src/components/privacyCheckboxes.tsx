import { Text, Link } from "@chakra-ui/core";

export const PrivacyCheckboxText = () => (
  <Text fontSize="sm" ml="2">
    Yes, I consent to my data being stored according to the guidelines set out
    in the{" "}
    <Link
      href="https://need-mask.com/privacy"
      target="_blank"
      color="blue.500"
      textDecoration="underline"
    >
      Privacy Policy
    </Link>
    . I know that I have the right to request erausre of my data stored by
    Need-Mask.com by contacting support@need-mask.com.
  </Text>
);
