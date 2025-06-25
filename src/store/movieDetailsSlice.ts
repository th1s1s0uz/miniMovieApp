import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieCredits, Person } from '../services/tmdbService';

interface MovieDetailsState {
  // Movie details
  movie: Movie | null;
  credits: MovieCredits | null;
  similarMovies: Movie[];
  
  // Person details (for cast bottom sheet)
  personDetails: Person | null;
  
  // Loading states
  movieLoading: boolean;
  creditsLoading: boolean;
  similarLoading: boolean;
  personLoading: boolean;
  
  // Error states
  movieError: string | null;
  creditsError: string | null;
  similarError: string | null;
  personError: string | null;
}

const initialState: MovieDetailsState = {
  movie: null,
  credits: null,
  similarMovies: [],
  personDetails: null,
  movieLoading: false,
  creditsLoading: false,
  similarLoading: false,
  personLoading: false,
  movieError: null,
  creditsError: null,
  similarError: null,
  personError: null,
};

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    // Movie details actions
    setMovieLoading: (state, action: PayloadAction<boolean>) => {
      state.movieLoading = action.payload;
      if (action.payload) state.movieError = null;
    },
    setMovieError: (state, action: PayloadAction<string | null>) => {
      state.movieError = action.payload;
      state.movieLoading = false;
    },
    setMovie: (state, action: PayloadAction<Movie | null>) => {
      state.movie = action.payload;
      state.movieLoading = false;
      state.movieError = null;
    },
    
    // Credits actions
    setCreditsLoading: (state, action: PayloadAction<boolean>) => {
      state.creditsLoading = action.payload;
      if (action.payload) state.creditsError = null;
    },
    setCreditsError: (state, action: PayloadAction<string | null>) => {
      state.creditsError = action.payload;
      state.creditsLoading = false;
    },
    setCredits: (state, action: PayloadAction<MovieCredits | null>) => {
      state.credits = action.payload;
      state.creditsLoading = false;
      state.creditsError = null;
    },
    
    // Similar movies actions
    setSimilarLoading: (state, action: PayloadAction<boolean>) => {
      state.similarLoading = action.payload;
      if (action.payload) state.similarError = null;
    },
    setSimilarError: (state, action: PayloadAction<string | null>) => {
      state.similarError = action.payload;
      state.similarLoading = false;
    },
    setSimilarMovies: (state, action: PayloadAction<Movie[]>) => {
      state.similarMovies = action.payload;
      state.similarLoading = false;
      state.similarError = null;
    },
    
    // Person details actions
    setPersonLoading: (state, action: PayloadAction<boolean>) => {
      state.personLoading = action.payload;
      if (action.payload) state.personError = null;
    },
    setPersonError: (state, action: PayloadAction<string | null>) => {
      state.personError = action.payload;
      state.personLoading = false;
    },
    setPersonDetails: (state, action: PayloadAction<Person | null>) => {
      state.personDetails = action.payload;
      state.personLoading = false;
      state.personError = null;
    },
    
    // Clear actions
    clearMovieDetails: (state) => {
      state.movie = null;
      state.credits = null;
      state.similarMovies = [];
      state.movieLoading = false;
      state.creditsLoading = false;
      state.similarLoading = false;
      state.movieError = null;
      state.creditsError = null;
      state.similarError = null;
    },
    clearPersonDetails: (state) => {
      state.personDetails = null;
      state.personLoading = false;
      state.personError = null;
    },
  },
});

export const {
  setMovieLoading,
  setMovieError,
  setMovie,
  setCreditsLoading,
  setCreditsError,
  setCredits,
  setSimilarLoading,
  setSimilarError,
  setSimilarMovies,
  setPersonLoading,
  setPersonError,
  setPersonDetails,
  clearMovieDetails,
  clearPersonDetails,
} = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer; 