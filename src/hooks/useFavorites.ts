import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { favoritesActions } from '../store/sagas/favoritesSaga';
import { Movie } from '../services/tmdbService';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const { movies: favorites, loading, error } = useAppSelector((state) => state.favorites);

  const loadFavorites = useCallback(() => {
    dispatch(favoritesActions.loadFavorites());
  }, [dispatch]);

  const addFavorite = useCallback((movie: Movie) => {
    dispatch(favoritesActions.addFavorite(movie));
  }, [dispatch]);

  const removeFavorite = useCallback((movieId: number) => {
    dispatch(favoritesActions.removeFavorite(movieId));
  }, [dispatch]);

  const toggleFavorite = useCallback((movie: Movie) => {
    dispatch(favoritesActions.toggleFavorite(movie));
  }, [dispatch]);

  const clearFavorites = useCallback(() => {
    dispatch(favoritesActions.clearFavorites());
  }, [dispatch]);

  const isFavorite = useCallback((movieId: number) => {
    return favorites.some(movie => movie.id === movieId);
  }, [favorites]);

  const getFavoriteCount = () => {
    return favorites.length;
  };

  return {
    favorites,
    loading,
    error,
    loadFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
    isFavorite,
    getFavoriteCount,
  };
}; 