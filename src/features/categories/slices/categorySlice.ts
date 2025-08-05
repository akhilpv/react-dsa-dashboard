import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
interface CategoryState {
  list: string[];
}

const initialState: CategoryState = {
  list: [],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.list.includes(action.payload)) {
        state.list.push(action.payload);
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((cat) => cat !== action.payload);
    },
    clearCategories: (state) => {
      state.list = [];
    },
  },
});

export const { addCategory, removeCategory, clearCategories } = categorySlice.actions;
export default categorySlice.reducer;