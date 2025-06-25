import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { searchActions } from '../store/sagas/searchSaga';

export const useSearch = () => {
  const dispatch = useAppDispatch();
  const { 
    searchResults = [],
    searchQuery = '',
    loading = false,
    error = null,
    hasSearched = false,
  } = useAppSelector((state) => state.search || {});

  const searchMovies = useCallback((query: string) => {
    dispatch(searchActions.searchMovies(query));
  }, [dispatch]);

  const clearSearch = useCallback(() => {
    dispatch(searchActions.clearSearch());
  }, [dispatch]);

  return {
    searchResults,
    searchQuery,
    hasSearched,
    
    loading,
    error,
    
    searchMovies,
    clearSearch,
  };
}; 