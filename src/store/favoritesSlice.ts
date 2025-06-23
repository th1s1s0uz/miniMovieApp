import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const FAVORITES_STORAGE_KEY = '@favorites_movies';

// AsyncStorage helpers
export const saveFavoritesToStorage = async (movies: Movie[]) => {
  try {
    await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(movies));
  } catch (error) {
    console.error('Error saving favorites to storage:', error);
  }
};

export const loadFavoritesFromStorage = async (): Promise<Movie[]> => {
  try {
    const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favorites from storage:', error);
    return [];
  }
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
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const exists = state.movies.find(m => m.id === movie.id);
      if (!exists) {
        state.movies.push(movie);
        saveFavoritesToStorage(state.movies);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      state.movies = state.movies.filter(movie => movie.id !== movieId);
      saveFavoritesToStorage(state.movies);
    },
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const exists = state.movies.find(m => m.id === movie.id);
      if (exists) {
        state.movies = state.movies.filter(m => m.id !== movie.id);
      } else {
        state.movies.push(movie);
      }
      saveFavoritesToStorage(state.movies);
    },
    clearFavorites: (state) => {
      state.movies = [];
      saveFavoritesToStorage([]);
    },
  },
});

export const {
  setLoading,
  setError,
  setFavorites,
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer; 