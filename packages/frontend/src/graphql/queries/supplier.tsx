import { Supplier } from "../../types/Supplier";

export const GET_SUPPLIER_FN = (id: string) => {
  return /* GraphQL */ `
    query GetSupplier {
      suppliers_by_pk(id: "${id}") {
        id
        firstName
        lastName
        email
        createdAt
        country
        continent
        companyName
        city
        published
        street
        updatedAt
        vatNumber
        zip
      }
    }
  `;
};

export const GET_SUPPLIER_FN_WITH_PRODUCTS = (id: string) => {
  return /* GraphQL */ `
    query GetSupplier {
      suppliers_by_pk(id: "${id}") {
        id
        firstName
        lastName
        email
        createdAt
        country
        continent
        companyName
        city
        published
        street
        updatedAt
        vatNumber
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
    }
  `;
};

export interface SupplierResponse {
  suppliers_by_pk: Supplier;
}
