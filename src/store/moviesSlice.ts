import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../services/tmdbService';

interface MoviesState {
  // Film kategorileri
  popularMovies: Movie[];
  trendingMovies: Movie[];
  nowPlayingMovies: Movie[];
  upcomingMovies: Movie[];
  topRatedMovies: Movie[];
  discoverMovies: Movie[];
  
  // Loading ve error durumları
  loading: boolean;
  refreshing: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  popularMovies: [],
  trendingMovies: [],
  nowPlayingMovies: [],
  upcomingMovies: [],
  topRatedMovies: [],
  discoverMovies: [],
  loading: true,
  refreshing: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.refreshing = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPopularMovies: (state, action: PayloadAction<Movie[]>) => {
      state.popularMovies = action.payload;
    },
    setTrendingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.trendingMovies = action.payload;
    },
    setNowPlayingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.nowPlayingMovies = action.payload;
    },
    setUpcomingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.upcomingMovies = action.payload;
    },
    setTopRatedMovies: (state, action: PayloadAction<Movie[]>) => {
      state.topRatedMovies = action.payload;
    },
    setDiscoverMovies: (state, action: PayloadAction<Movie[]>) => {
      state.discoverMovies = action.payload;
    },
    clearMovies: (state) => {
      state.popularMovies = [];
      state.trendingMovies = [];
      state.nowPlayingMovies = [];
      state.upcomingMovies = [];
      state.topRatedMovies = [];
      state.discoverMovies = [];
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setRefreshing,
  setError,
  setPopularMovies,
  setTrendingMovies,
  setNowPlayingMovies,
  setUpcomingMovies,
  setTopRatedMovies,
  setDiscoverMovies,
  clearMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer; 