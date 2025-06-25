import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { movieDetailsActions } from '../store/sagas/movieDetailsSaga';
import { clearMovieDetails, clearPersonDetails } from '../store/movieDetailsSlice';

export const useMovieDetails = () => {
  const dispatch = useAppDispatch();
  const {
    movie,
    credits,
    similarMovies,
    movieLoading,
    creditsLoading,
    similarLoading,
    movieError,
    creditsError,
    similarError,
  } = useAppSelector((state) => state.movieDetails);

  const fetchMovieDetails = useCallback((movieId: number) => {
    dispatch(movieDetailsActions.fetchMovieDetails(movieId));
  }, [dispatch]);

  const fetchMovieCredits = useCallback((movieId: number) => {
    dispatch(movieDetailsActions.fetchMovieCredits(movieId));
  }, [dispatch]);

  const fetchSimilarMovies = useCallback((movieId: number) => {
    dispatch(movieDetailsActions.fetchSimilarMovies(movieId));
  }, [dispatch]);

  const fetchAllMovieData = useCallback((movieId: number) => {
    dispatch(movieDetailsActions.fetchAllMovieData(movieId));
  }, [dispatch]);

  const clearMovieData = useCallback(() => {
    dispatch(clearMovieDetails());
  }, [dispatch]);

  // Combined loading state
  const isLoading = movieLoading || creditsLoading || similarLoading;
  
  // Combined error state
  const error = movieError || creditsError || similarError;

  return {
    // Data
    movie,
    credits,
    similarMovies,
    
    // Loading states
    movieLoading,
    creditsLoading,
    similarLoading,
    isLoading,
    
    // Error states
    movieError,
    creditsError,
    similarError,
    error,
    
    // Actions
    fetchMovieDetails,
    fetchMovieCredits,
    fetchSimilarMovies,
    fetchAllMovieData,
    clearMovieData,
  };
};

export const usePersonDetails = () => {
  const dispatch = useAppDispatch();
  const {
    personDetails,
    personLoading,
    personError,
  } = useAppSelector((state) => state.movieDetails);

  const fetchPersonDetails = useCallback((personId: number) => {
    dispatch(movieDetailsActions.fetchPersonDetails(personId));
  }, [dispatch]);

  const clearPersonData = useCallback(() => {
    dispatch(clearPersonDetails());
  }, [dispatch]);

  return {
    // Data
    personDetails,
    
    // Loading state
    personLoading,
    
    // Error state
    personError,
    
    // Actions
    fetchPersonDetails,
    clearPersonData,
  };
}; 