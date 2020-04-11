import { Supplier } from "../../types/Supplier";
export const LISTINGS_PER_PAGE = 3;

// recursively add where params
const createAndWhereFilters = (products) => {
  if (products.length === 0) return "";
  const [first, ...rest] = products;
  const and = rest.length > 0 ? createAndWhereFilters([rest]) : "";
  return `, _and: {products: {productType: {title: {_eq: "${first}"}}} ${and}}`;
};

export const GET_LISTINGS_FN = (products: String[]) => {
  let productFilter = "";
  if (products.length > 0) {
    const [first, ...elements] = products;
    const and = createAndWhereFilters(elements);
    productFilter = `where: {products: {productType: {title: {_eq: "${first}"}}}${and}}`;
  }
  const getFilter = productFilter ? ", " + productFilter : "";
  const aggregateFilter = productFilter ? `(${productFilter})` : "";
  const query = /* GraphQL */ `
    query GetListings($offset:Int) {
      suppliers(limit: ${LISTINGS_PER_PAGE}, offset: $offset${getFilter}) {
        id 
        country
        city
        companyName
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
      suppliers_aggregate${aggregateFilter}{aggregate{count}}
    }
`;

  return query;
};

export interface SupplierResponse {
  suppliers: Supplier[];
}
