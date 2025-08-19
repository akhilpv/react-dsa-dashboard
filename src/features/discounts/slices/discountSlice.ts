import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DoubleEndedPQ } from "../../../utils/doubleEndedPQ";
interface DiscountItem {
  productId: string;
  label: string;
  priority: number; 
}

interface DiscountState {
  pq: DoubleEndedPQ<DiscountItem>;
  list: DiscountItem[];
}

const initialState: DiscountState = {
  pq: new DoubleEndedPQ<DiscountItem>(),
  list: []
};

const discountSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    addProductDiscount: (
      state,
      action: PayloadAction<{ productId: string; label: string; discount: number }>
    ) => {
      const discountItem: DiscountItem = {
        productId: action.payload.productId,
        label: action.payload.label,
        priority: action.payload.discount
      };
      state.pq.insert(discountItem, discountItem.priority);
      state.list = state.pq.getAll();
    }
  }
});

export const { addProductDiscount } = discountSlice.actions;
export default discountSlice.reducer;