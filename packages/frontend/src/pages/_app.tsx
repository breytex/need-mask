import * as React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { customTheme } from "../chakra/theme";
import PageLayout from "../components/PageLayout";
import "react-medium-image-zoom/dist/styles.css";
import "../styles.css";
import { NextPageContext, NextPage } from "next";
import { graphQuery } from "../graphql/graphQuery";
import { GET_PRODUCT_TYPES } from "../graphql/queries/products";
import { ProductType } from "aws-sdk/clients/servicecatalog";
import { ProductTypeContextProvider } from "../context/ProductTypeContext";

export type NextPagesExtended<T> = NextPage<T> & {
  productTypes: ProductType[];
};

export default function App({ Component, pageProps, productTypeData }) {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <ProductTypeContextProvider productTypes={productTypeData.productTypes}>
        <PageLayout>
          <Component
            productTypes={productTypeData.productTypes}
            {...pageProps}
          />
        </PageLayout>
      </ProductTypeContextProvider>
    </ThemeProvider>
  );
}

App.getInitialProps = async function (ctx: NextPageContext) {
  const { data: productTypeData } = await graphQuery(GET_PRODUCT_TYPES);
  return {
    productTypeData,
  };
};
