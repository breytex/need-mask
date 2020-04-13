export interface Capacity {
  title: string;
  capacity: number;
}

export interface CapacityResponseNode {
  title: string;
  products_aggregate: {
    aggregate: {
      sum: {
        capacity: number;
      };
    };
  };
}

export interface CapacityResponse {
  data: {
    productTypes_aggregate: { nodes: CapacityResponseNode[] };
  };
}
