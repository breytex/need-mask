import { Supplier } from "../../types/Supplier";

export const GET_LISTINGS = `
    query GetListings {
        suppliers {
            country
            companyName
            zip
            products {
              capacity
              description
              id
              leadTime
              maxPrice
              minOrderAmount
              minPrice
              title
              unit
              createdAt
              id
              createdAt
              updatedAt
              productType {
                title
                description
                id
                createdAt
                updatedAt
              }
            }
          }
    }
`;

export interface SupplierResponse {
  suppliers: Supplier[];
}
