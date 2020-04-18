import React, { useContext, createContext, ReactNode } from "react";
import { ProductType } from "../types/Product";

export const ProductTypeContext = createContext<ProductType[]>([]);

interface Props {
  productTypes: ProductType[];
  children: ReactNode;
}

export const ProductTypeContextProvider = ({
  productTypes,
  children,
}: Props) => {
  return (
    <ProductTypeContext.Provider value={productTypes}>
      {children}
    </ProductTypeContext.Provider>
  );
};

export const useProductTypes = () => {
  const context = useContext(ProductTypeContext);
  if (!context)
    throw new Error(
      "useProductType must be used within <ProductTypeContextProvider>"
    );
  return context;
};

export default ProductTypeContext;
