import { Supplier } from "../../types/Supplier";
export const LISTINGS_PER_PAGE = 3;

// recursively add where params
const createAndWhereFilters = (products, firstWhere = false) => {
  if (products.length === 0) return "";
  const [first, ...rest] = products;
  const and = rest.length > 0 ? createAndWhereFilters([rest]) : "";

  if (firstWhere) {
    return `{products: {productType: {title: {_eq: "${first}"}}} ${and}}`;
  } else {
    return `, _and: {products: {productType: {title: {_eq: "${first}"}}} ${and}}`;
  }
};

export const GET_LISTINGS_FN = (products: String[], continent?: String) => {
  let productFilter = "";
  if (products.length > 0) {
    productFilter = createAndWhereFilters(products, !continent);
  }

  let combinedFilter = productFilter;
  console.log({ continent });
  if (!!continent) {
    combinedFilter = `{continent: {_eq: "${continent}"}${productFilter}}`;
  }

  const getFilter = combinedFilter !== "" ? `, where: ${combinedFilter}` : "";
  const aggregateFilter = productFilter ? `(where: ${combinedFilter})` : "";
  const query = `
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
  console.log({ query });
  return query;
};

export interface SupplierResponse {
  suppliers: Supplier[];
}
