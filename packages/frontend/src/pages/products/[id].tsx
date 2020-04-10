import * as React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

const ProductDetailPage: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <h2>ProductDetailPage</h2> pageId: {router.query.id}
    </div>
  );
};

export default ProductDetailPage;
