export const GET_REQUEST_PRODUCTS_BY_REQUEST = /* GraphQL */ `
  query GetRequestProductsBySupplier($requestId: uuid!) {
    requestProducts(where: { requestId: { _eq: $requestId } }) {
      id
      createdAt
      amount
      productId
      requestId
      updatedAt
      product {
        id
        title
        supplier {
          firstName
          lastName
          status
          email
          companyName
          web
        }
        productType {
          title
        }
      }
    }
  }
`;
