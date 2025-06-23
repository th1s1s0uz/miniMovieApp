import { useState, useEffect } from 'react';
import { Movie, useTmdbApi } from '../services/tmdbService';

export const useMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [discoverMovies, setDiscoverMovies] = useState<Movie[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API hooks
  const popularApi = useTmdbApi.usePopularMovies(1);
  const nowPlayingApi = useTmdbApi.useNowPlayingMovies(1);
  const topRatedApi = useTmdbApi.useTopRatedMovies(1);
  const trendingApi = useTmdbApi.useTrendingMovies(1);
  const upcomingApi = useTmdbApi.useUpcomingMovies(1);
  const discoverApi = useTmdbApi.useDiscoverMovies(1, 'vote_average.desc');

  const fetchAllMovies = async () => {
    try {
      setError(null);
      
      // Fetch all movie categories in parallel using the new API hooks
      const [popularResult, nowPlayingResult, topRatedResult, trendingResult, upcomingResult, discoverResult] = await Promise.all([
        popularApi.execute(1),
        nowPlayingApi.execute(1),
        topRatedApi.execute(1),
        trendingApi.execute(1),
        upcomingApi.execute(1),
        discoverApi.execute(1, 'vote_average.desc')
      ]);
      
      // Update state with results
      if (popularResult) setPopularMovies(popularResult.results);
      if (nowPlayingResult) setNowPlayingMovies(nowPlayingResult.results);
      if (topRatedResult) setTopRatedMovies(topRatedResult.results);
      if (trendingResult) setTrendingMovies(trendingResult.results);
      if (upcomingResult) setUpcomingMovies(upcomingResult.results);
      if (discoverResult) setDiscoverMovies(discoverResult.results);
      
      // Check if any API calls failed
      const failedCalls = [popularResult, nowPlayingResult, topRatedResult, trendingResult, upcomingResult, discoverResult].filter(result => !result);
      if (failedCalls.length > 0) {
        setError('Bazı film kategorileri yüklenemedi');
      }
    } catch (err) {
      setError('Filmler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllMovies();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  // Combine loading states from all API hooks
  const isLoading = loading || popularApi.loading || nowPlayingApi.loading || topRatedApi.loading || trendingApi.loading || upcomingApi.loading || discoverApi.loading;
  
  // Combine error states from all API hooks
  const combinedError = error || popularApi.error || nowPlayingApi.error || topRatedApi.error || trendingApi.error || upcomingApi.error || discoverApi.error;

  return {
    // Movie data
    trendingMovies,
    popularMovies,
    nowPlayingMovies,
    upcomingMovies,
    topRatedMovies,
    discoverMovies,
    
    // Loading states
    loading: isLoading,
    refreshing,
    error: combinedError,
    
    // Actions
    onRefresh,
  };
}; 