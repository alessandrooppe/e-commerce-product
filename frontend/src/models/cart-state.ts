import { CartItem } from "./cartI-item";

export interface CartState {
  items: CartItem[];
  total: number;
}