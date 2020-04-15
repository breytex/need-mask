import React, { ReactElement } from "react";
import { Button, ButtonProps } from "@chakra-ui/core";
import Link from "next/link";
import { UrlObject } from "url";

type Props = ButtonProps & {
  href: string | UrlObject;
  params?: { [key: string]: string };
};

const getActualHref = (href, params) => {
  if (!params) return href;

  let result = href;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`[${key}]`, value);
  });

  return result;
};

export default function LinkButton(props: Props): ReactElement {
  const { href, params, ...rest } = props;

  return (
    <Link href={href} as={getActualHref(href, params)}>
      <a style={{ display: "inline-block" }}>
        <Button {...rest} />
      </a>
    </Link>
  );
}
