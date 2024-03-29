import React from "react";
import Head from "next/head";

interface Props {
  title: string;
}

const PageHead = ({ title }: Props) => {
  return (
    <Head>
      <title>{title} | need-mask.com</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

export default PageHead;
