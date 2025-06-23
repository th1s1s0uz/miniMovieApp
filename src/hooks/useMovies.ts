import { useState, useEffect } from 'react';
import { Movie, tmdbService } from '../services/tmdbService';

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

  const fetchAllMovies = async () => {
    try {
      setError(null);
      
      // Fetch all movie categories in parallel
      const [popularResponse, nowPlayingResponse, topRatedResponse, trendingResponse, upcomingResponse, discoverResponse] = await Promise.all([
        tmdbService.getPopularMovies(1),
        tmdbService.getNowPlayingMovies(1),
        tmdbService.getTopRatedMovies(1),
        tmdbService.getTrendingMovies(1),
        tmdbService.getUpcomingMovies(1),
        tmdbService.getDiscoverMovies(1, 'vote_average.desc')
      ]);
      
      setPopularMovies(popularResponse.results);
      setNowPlayingMovies(nowPlayingResponse.results);
      setTopRatedMovies(topRatedResponse.results);
      setTrendingMovies(trendingResponse.results);
      setUpcomingMovies(upcomingResponse.results);
      setDiscoverMovies(discoverResponse.results);
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
  };
}; 