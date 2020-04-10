import { ProductType } from "./Listing";

export enum Location {
  EUROPE = "Europe",
  N_AMERICA = "North America",
  S_AMERICA = "South America",
  AFRICA = "Africa",
  ASIA = "Asia",
  AUSTRALIA = "Australia",
}

export interface Filters {
  location?: Location;
  produts?: ProductType[];
}

export const defaultFilter = {
  location: null,
  produt: [],
};
