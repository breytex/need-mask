import { Supplier } from "../../types/Supplier";

export const GET_SUPPLIER_FN = (id: string) => {
  return /* GraphQL */ `
    query GetSupplier {
      suppliers_by_pk(id: "${id}") {
        id
        country
        continent
        companyName
        city
        web
        createdAt
        updatedAt
      }
    }
  `;
};

export const GET_SUPPLIER_FN_WITH_PRODUCTS = (id: string) => {
  return /* GraphQL */ `
    query GetSupplier {
      suppliers_by_pk(id: "${id}") {
        id
        country
        continent
        companyName
        city
        web
        createdAt
        updatedAt
        products {
          id
          capacity
          description
          leadTime
          maxPrice
          minOrderAmount
          minPrice
          title
          createdAt
          updatedAt
          typeId
          productType {
            id
            title
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

export const GET_ALL_SUPPLIER_IDS = `
  query GetSupplierWithProducts {
    suppliers {
      id
    }
  }
`;

export const GET_SUPPLIER_WITH_PRODUCTS = /* GraphQL */ `
  query GetSupplierWithProducts($supplierId: uuid!) {
    suppliers_by_pk(id: $supplierId) {
      id
      country
      continent
      companyName
      city
      web
      products(order_by: { productType: { title: desc } }) {
        id
        capacity
        description
        leadTime
        maxPrice
        minOrderAmount
        minPrice
        title
        typeId
        productType {
          id
          title
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

export const GET_FULL_SUPPLIER_WITH_PRODUCTS = (id: string) => {
  return /* GraphQL */ `
    query GetSupplierFull {
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
          createdAt
          updatedAt
          typeId
          productType {
            id
            title
            createdAt
            updatedAt
          }
          files {
            file {
              id
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
