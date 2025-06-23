import { createAsyncThunk } from '@reduxjs/toolkit';
import { setFavorites, setLoading, setError } from './favoritesSlice';
import { loadFavoritesFromStorage } from './favoritesSlice';
import { Movie } from '../services/tmdbService';

// Thunk for loading favorites from storage
export const loadFavorites = createAsyncThunk(
  'favorites/loadFavorites',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const movies = await loadFavoritesFromStorage();
      dispatch(setFavorites(movies));
      return movies;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load favorites';
      dispatch(setError(errorMessage));
      throw error;
    }
  }
);

// Thunk for checking if a movie is favorite
export const checkIfFavorite = (movieId: number) => (state: any) => {
  return state.favorites.movies.some((movie: Movie) => movie.id === movieId);
}; 