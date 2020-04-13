import { Product } from "./Supplier";

export interface Filters {
  location?: Location;
  products?: Product[];
}

export const defaultFilter = {
  location: null,
  products: [],
};
