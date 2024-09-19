import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { CartState } from "../models/cart-state";
import { CartItem } from "../models/cartI-item";
import { Product } from "../models/product";

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      console.log(action.payload);
      const existingItem = state.items.find((item: { product: Product; }) => item.product.id === action.payload.product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.product.price;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item: { product: Product; }) => item.product.id === action.payload);
      if (index !== -1) {
        state.total -= state.items[index].product.price * state.items[index].quantity;
        state.items.splice(index, 1);
      }
    },
    // increaseQuantity: (state, action: PayloadAction<number>) => {
    //   const item = state.items.find((item: { id: number; }) => item.id === action.payload);
    //   if (item) {
    //     item.quantity += 1;
    //     state.total += item.price;
    //   }
    // },
    // decreaseQuantity: (state, action: PayloadAction<number>) => {
    //   const item = state.items.find((item: { id: number; }) => item.id === action.payload);
    //   if (item && item.quantity > 1) {
    //     item.quantity -= 1;
    //     state.total -= item.price;
    //   }
    // },
  },
});
// , increaseQuantity, decreaseQuantity
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;