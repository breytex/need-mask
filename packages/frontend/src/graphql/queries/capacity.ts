export const GET_CAPACITY_PER_PRODUCT = /* GraphQL */ `
  query AggregateCapacity {
    productTypes_aggregate {
      nodes {
        title
        products_aggregate {
          aggregate {
            sum {
              capacity
            }
          }
        }
      }
    }
  }
`;
