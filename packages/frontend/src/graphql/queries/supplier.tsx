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
        street
        houseNumber
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
        street
        houseNumber
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
          files {
            file {
              url
              fileType
              fileKind
            }
          }
        }
      }
    }
  `;
};

export interface SupplierResponse {
  suppliers_by_pk: Supplier;
}
