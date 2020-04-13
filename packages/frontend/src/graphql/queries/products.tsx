import { ProductType } from "../../types/Product";

export const GET_PRODUCT_TYPES = /* GraphQL */ `
  query GetProductTypes {
    productTypes {
      title
      description
      id
    }
  }
`;

export interface ProductTypeResponse {
  productTypes: ProductType[];
}
