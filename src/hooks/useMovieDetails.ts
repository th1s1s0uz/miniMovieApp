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

  const isLoading = movieLoading || creditsLoading || similarLoading;
  
  const error = movieError || creditsError || similarError;

  return {
    movie,
    credits,
    similarMovies,
    
    movieLoading,
    creditsLoading,
    similarLoading,
    isLoading,
    
    movieError,
    creditsError,
    similarError,
    error,
    
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
    personDetails,
    
    personLoading,
    
    personError,
    
    fetchPersonDetails,
    clearPersonData,
  };
}; 