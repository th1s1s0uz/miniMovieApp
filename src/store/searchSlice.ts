import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../services/tmdbService';

interface SearchState {
  searchResults: Movie[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
  scrollResetTrigger: number;
}

const initialState: SearchState = {
  searchResults: [],
  searchQuery: '',
  loading: false,
  error: null,
  hasSearched: false,
  scrollResetTrigger: 0,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<Movie[]>) => {
      state.searchResults = action.payload;
      state.hasSearched = true;
      // Trigger scroll reset only when search results change
      state.scrollResetTrigger = Date.now();
    },
    setSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSearchError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setHasSearched: (state, action: PayloadAction<boolean>) => {
      state.hasSearched = action.payload;
    },
    clearSearch: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
      state.hasSearched = false;
      state.error = null;
      // Trigger scroll reset when search is cleared
      state.scrollResetTrigger = Date.now();
    },
    triggerScrollReset: (state) => {
      state.scrollResetTrigger = Date.now();
    },
  },
});

export const {
  setSearchQuery,
  setSearchResults,
  setSearchLoading,
  setSearchError,
  setHasSearched,
  clearSearch,
  triggerScrollReset,
} = searchSlice.actions;

export default searchSlice.reducer; 