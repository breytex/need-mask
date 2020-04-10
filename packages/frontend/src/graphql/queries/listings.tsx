import { Supplier } from "../../types/Supplier";
export const LISTINGS_PER_PAGE = 3;

export const GET_LISTINGS = `
    query GetListings($offset:Int) {
        suppliers(limit: ${LISTINGS_PER_PAGE}, offset: $offset) {
            id
            country
            companyName
            zip
            products {
              id
              capacity
              description
              leadTime
              maxPrice
              minOrderAmount
              minPrice
              title
              unit
              createdAt
              createdAt
              updatedAt
              productType {
                id
                title
                description
                createdAt
                updatedAt
              }
            }
        }
        suppliers_aggregate{aggregate{count}}
    }
`;

export interface SupplierResponse {
  suppliers: Supplier[];
}
