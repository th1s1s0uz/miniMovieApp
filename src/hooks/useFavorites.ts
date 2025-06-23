import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToFavorites, removeFromFavorites, toggleFavorite } from '../store/favoritesSlice';
import { Movie } from '../services/tmdbService';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const { movies: favorites, loading, error } = useAppSelector((state) => state.favorites);

  const addFavorite = (movie: Movie) => {
    dispatch(addToFavorites(movie));
  };

  const removeFavorite = (movieId: number) => {
    dispatch(removeFromFavorites(movieId));
  };

  const toggleFavoriteMovie = (movie: Movie) => {
    dispatch(toggleFavorite(movie));
  };

  const isFavorite = (movieId: number) => {
    return favorites.some(movie => movie.id === movieId);
  };

  const getFavoriteCount = () => {
    return favorites.length;
  };

  return {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    toggleFavoriteMovie,
    isFavorite,
    getFavoriteCount,
  };
}; 