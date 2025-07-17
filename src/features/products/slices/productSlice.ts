import  { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types/product.types';

interface ProductState {
  products: Product[];
  undoStack: Product[][];
  redoStack: Product[][];
}

const initialState: ProductState = {
  products: [],
  undoStack: [],
  redoStack: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.undoStack.push([...state.products]); 
      state.products.push(action.payload);
      state.redoStack = []; 
    },
    undo(state) {
      if (state.undoStack.length > 0) {
        state.redoStack.push([...state.products]);
        const prev = state.undoStack.pop();
        if (prev) state.products = prev;
      }
    },
    redo(state) {
      if (state.redoStack.length > 0) {
        state.undoStack.push([...state.products]);
        const next = state.redoStack.pop();
        if (next) state.products = next;
      }
    },
  },
});

export const { addProduct, undo, redo } = productSlice.actions;
export default productSlice.reducer;