import { Supplier } from "./Supplier";

export interface Report {
  id: string;
  reason: string;
  supplierId: string;
  supplier?: Supplier;
}
