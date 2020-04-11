import React from "react";

interface Props {
  prefix: string;
}

const Product = (props: Props) => {
  const { prefix } = props;
  return <div>{prefix}</div>;
};

export default Product;
