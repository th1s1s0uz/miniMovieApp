import { call, put, takeLatest, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '../../services/tmdbService';
import { setLoading, setError, setFavorites } from '../favoritesSlice';
import { handleSagaError, showSuccessMessage } from '../../utils/errorUtils';

// Action types
export const FAVORITES_ACTIONS = {
  LOAD_FAVORITES: 'favorites/loadFavorites',
  ADD_FAVORITE: 'favorites/addFavorite',
  REMOVE_FAVORITE: 'favorites/removeFavorite',
  TOGGLE_FAVORITE: 'favorites/toggleFavorite',
  CLEAR_FAVORITES: 'favorites/clearFavorites',
} as const;

// Action creators
export const favoritesActions = {
  loadFavorites: () => ({ type: FAVORITES_ACTIONS.LOAD_FAVORITES }),
  addFavorite: (movie: Movie) => ({ 
    type: FAVORITES_ACTIONS.ADD_FAVORITE, 
    payload: { movie } 
  }),
  removeFavorite: (movieId: number) => ({ 
    type: FAVORITES_ACTIONS.REMOVE_FAVORITE, 
    payload: { movieId } 
  }),
  toggleFavorite: (movie: Movie) => ({ 
    type: FAVORITES_ACTIONS.TOGGLE_FAVORITE, 
    payload: { movie } 
  }),
  clearFavorites: () => ({ type: FAVORITES_ACTIONS.CLEAR_FAVORITES }),
};

// Storage key
const FAVORITES_STORAGE_KEY = '@movie_app_favorites';

// Debounce delay for storage operations
const STORAGE_DEBOUNCE_DELAY = 100;

// Helper function to save favorites to storage with error handling
const saveFavoritesToStorage = async (favorites: Movie[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to storage:', error);
    throw error;
  }
};

// Helper function to load favorites from storage with error handling
const loadFavoritesFromStorage = async (): Promise<Movie[]> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error loading favorites from storage:', error);
    throw error;
  }
};

// Optimized storage operation with debouncing
let storageTimeout: NodeJS.Timeout | null = null;
const debouncedSaveToStorage = (favorites: Movie[]) => {
  if (storageTimeout) {
    clearTimeout(storageTimeout);
  }
  
  storageTimeout = setTimeout(() => {
    saveFavoritesToStorage(favorites);
  }, STORAGE_DEBOUNCE_DELAY);
};

// Saga functions
function* loadFavoritesSaga() {
  try {
    yield put(setLoading(true));
    
    const favorites: Movie[] = yield call(loadFavoritesFromStorage);
    yield put(setFavorites(favorites));
    yield put(setLoading(false));
    
  } catch (error) {
    yield* handleSagaError(error, 'FAVORITES');
    yield put(setLoading(false));
  }
}

function* addFavoriteSaga(action: { payload: { movie: Movie } }) {
  try {
    const { movie } = action.payload;
    
    // Get current favorites from state
    const currentFavorites: Movie[] = yield select((state) => state.favorites.movies);
    
    // Check if movie is already in favorites
    const isAlreadyFavorite = currentFavorites.some(fav => fav.id === movie.id);
    
    if (isAlreadyFavorite) {
      yield* showSuccessMessage('Film zaten favorilerinizde!', 'Favoriler');
      return;
    }
    
    // Add movie to favorites
    const newFavorites = [...currentFavorites, movie];
    
    // Update state immediately for better UX
    yield put(setFavorites(newFavorites));
    
    // Save to storage with debouncing
    debouncedSaveToStorage(newFavorites);
    
    yield* showSuccessMessage('Film favorilere eklendi!', 'Favoriler');
    
  } catch (error) {
    yield* handleSagaError(error, 'FAVORITES');
  }
}

function* removeFavoriteSaga(action: { payload: { movieId: number } }) {
  try {
    const { movieId } = action.payload;
    
    // Get current favorites from state
    const currentFavorites: Movie[] = yield select((state) => state.favorites.movies);
    
    // Remove movie from favorites
    const newFavorites = currentFavorites.filter(fav => fav.id !== movieId);
    
    // Update state immediately for better UX
    yield put(setFavorites(newFavorites));
    
    // Save to storage with debouncing
    debouncedSaveToStorage(newFavorites);
    
    yield* showSuccessMessage('Film favorilerden kaldırıldı!', 'Favoriler');
    
  } catch (error) {
    yield* handleSagaError(error, 'FAVORITES');
  }
}

function* toggleFavoriteSaga(action: { payload: { movie: Movie } }) {
  try {
    const { movie } = action.payload;
    
    // Get current favorites from state
    const currentFavorites: Movie[] = yield select((state) => state.favorites.movies);
    
    // Check if movie is already in favorites
    const isAlreadyFavorite = currentFavorites.some(fav => fav.id === movie.id);
    
    let newFavorites: Movie[];
    let message: string;
    
    if (isAlreadyFavorite) {
      // Remove from favorites
      newFavorites = currentFavorites.filter(fav => fav.id !== movie.id);
      message = 'Film favorilerden kaldırıldı!';
    } else {
      // Add to favorites
      newFavorites = [...currentFavorites, movie];
      message = 'Film favorilere eklendi!';
    }
    
    // Update state immediately for better UX
    yield put(setFavorites(newFavorites));
    
    // Save to storage with debouncing
    debouncedSaveToStorage(newFavorites);
    
    yield* showSuccessMessage(message, 'Favoriler');
    
  } catch (error) {
    yield* handleSagaError(error, 'FAVORITES');
  }
}

function* clearFavoritesSaga() {
  try {
    // Update state immediately for better UX
    yield put(setFavorites([]));
    
    // Clear from storage
    yield call(AsyncStorage.removeItem, FAVORITES_STORAGE_KEY);
    
    yield* showSuccessMessage('Tüm favoriler temizlendi!', 'Favoriler');
    
  } catch (error) {
    yield* handleSagaError(error, 'FAVORITES');
  }
}

// Watcher saga
export function* favoritesSaga() {
  yield takeLatest(FAVORITES_ACTIONS.LOAD_FAVORITES, loadFavoritesSaga);
  yield takeLatest(FAVORITES_ACTIONS.ADD_FAVORITE, addFavoriteSaga);
  yield takeLatest(FAVORITES_ACTIONS.REMOVE_FAVORITE, removeFavoriteSaga);
  yield takeLatest(FAVORITES_ACTIONS.TOGGLE_FAVORITE, toggleFavoriteSaga);
  yield takeLatest(FAVORITES_ACTIONS.CLEAR_FAVORITES, clearFavoritesSaga);
} 