import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type TabState = {
  [productId: string]: {
    activeTab: string;
    lastVisitedTab?: string;
  };
};

const initialState: TabState = {};

const tabsSlice = createSlice({
  name: 'productTabs',
  initialState,
  reducers: {
    setActiveTab: (
      state,
      action: PayloadAction<{ productId: string; tab: string }>
    ) => {
      const { productId, tab } = action.payload;
      const current = state[productId];
      state[productId] = {
        activeTab: tab,
        lastVisitedTab: current?.activeTab,
      };
    },
    resetTab: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { setActiveTab, resetTab } = tabsSlice.actions;
export default tabsSlice.reducer;