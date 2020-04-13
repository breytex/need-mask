import { Product } from "./Product";

export interface Filters {
  location?: Location;
  products?: Product[];
}

export const defaultFilter = {
  location: null,
  products: [],
};
