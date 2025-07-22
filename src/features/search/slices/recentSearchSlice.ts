import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface RecentSearchState {
  terms: string[];
}

const MAX_RECENT = 5;

const initialState: RecentSearchState = {
  terms: [],
};

const recentSearchSlice = createSlice({
  name: 'recentSearch',
  initialState,
  reducers: {
    addSearchTerm(state, action: PayloadAction<string>) {
      const term = action.payload.trim().toLowerCase();
      const filtered = state.terms.filter((t) => t !== term);
      state.terms = [term, ...filtered].slice(0, MAX_RECENT);
    },
    clearSearchTerms(state) {
      state.terms = [];
    },
  },
});

export const { addSearchTerm, clearSearchTerms } = recentSearchSlice.actions;
export default recentSearchSlice.reducer;