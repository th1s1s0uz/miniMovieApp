import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../services/tmdbService';

interface FavoritesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  movies: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFavorites: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer; 