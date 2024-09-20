import { Product } from "./product";

export interface ProductResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}