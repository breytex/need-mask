import { Product } from "./Supplier";

export interface Filters {
  location?: Location;
  produts?: Product[];
}

export const defaultFilter = {
  location: null,
  produt: [],
};
