import { Product } from "./Supplier";

export enum Continent {
  EUROPE = "Europe",
  N_AMERICA = "North America",
  S_AMERICA = "South America",
  AFRICA = "Africa",
  ASIA = "Asia",
  AUSTRALIA = "Australia",
}

export interface Filters {
  location?: Location;
  produts?: Product[];
}

export const defaultFilter = {
  location: null,
  produt: [],
};
