import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { moviesActions } from '../store/sagas/moviesSaga';

export const useMovies = () => {
  const dispatch = useAppDispatch();
  const { 
    popularMovies = [],
    trendingMovies = [],
    nowPlayingMovies = [],
    upcomingMovies = [],
    topRatedMovies = [],
    discoverMovies = [],
    loading = true,
    refreshing = false,
    error = null,
  } = useAppSelector((state) => state.movies || {});

  const fetchAllMovies = () => {
    dispatch(moviesActions.fetchAllMovies());
  };

  const onRefresh = () => {
    dispatch(moviesActions.fetchAllMovies());
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  return {
    // Movie data
    trendingMovies,
    popularMovies,
    nowPlayingMovies,
    upcomingMovies,
    topRatedMovies,
    discoverMovies,
    
    // Loading states
    loading,
    refreshing,
    error,
    
    // Actions
    onRefresh,
    fetchAllMovies,
  };
}; 