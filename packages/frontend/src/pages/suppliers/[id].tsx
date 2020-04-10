import * as React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

const SupplierDetailPage: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <h2>SupplierDetailPage</h2> pageId: {router.query.id}
    </div>
  );
};

export default SupplierDetailPage;
