import { call, put, takeLatest, all } from 'redux-saga/effects';
import { tmdbService } from '../../services/tmdbService';
import {
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
} from '../movieDetailsSlice';
import { handleSagaError } from '../../utils/errorUtils';

// Action types
export const movieDetailsActions = {
  fetchMovieDetails: (movieId: number) => ({ type: 'movieDetails/fetchMovieDetails' as const, payload: { movieId } }),
  fetchMovieCredits: (movieId: number) => ({ type: 'movieDetails/fetchMovieCredits' as const, payload: { movieId } }),
  fetchSimilarMovies: (movieId: number) => ({ type: 'movieDetails/fetchSimilarMovies' as const, payload: { movieId } }),
  fetchPersonDetails: (personId: number) => ({ type: 'movieDetails/fetchPersonDetails' as const, payload: { personId } }),
  fetchAllMovieData: (movieId: number) => ({ type: 'movieDetails/fetchAllMovieData' as const, payload: { movieId } }),
};

// Cache duration (10 minutes for movie details)
const CACHE_DURATION = 10 * 60 * 1000;

// Simple cache for movie details
const movieDetailsCache = new Map<string, { data: any; timestamp: number }>();

// Cache helper functions
const getMovieCacheKey = (type: string, id: number) => `${type}_${id}`;

const isMovieCacheValid = (key: string) => {
  const cached = movieDetailsCache.get(key);
  if (!cached) return false;
  return Date.now() - cached.timestamp < CACHE_DURATION;
};

const getCachedMovieData = (key: string) => {
  const cached = movieDetailsCache.get(key);
  return cached ? cached.data : null;
};

const setCachedMovieData = (key: string, data: any) => {
  movieDetailsCache.set(key, { data, timestamp: Date.now() });
};

// Saga functions
function* fetchMovieDetailsSaga(action: ReturnType<typeof movieDetailsActions.fetchMovieDetails>) {
  try {
    const { movieId } = action.payload;
    const cacheKey = getMovieCacheKey('movie', movieId);
    
    // Check cache first
    const cachedData = getCachedMovieData(cacheKey);
    if (cachedData && isMovieCacheValid(cacheKey)) {
      yield put(setMovie(cachedData));
      return;
    }
    
    yield put(setMovieLoading(true));
    
    const movie = yield call(tmdbService.getMovieDetails, movieId);
    setCachedMovieData(cacheKey, movie);
    yield put(setMovie(movie));
    
  } catch (error) {
    yield* handleSagaError(error, 'MOVIE_DETAILS');
    yield put(setMovieError(null));
  }
}

function* fetchMovieCreditsSaga(action: ReturnType<typeof movieDetailsActions.fetchMovieCredits>) {
  try {
    const { movieId } = action.payload;
    const cacheKey = getMovieCacheKey('credits', movieId);
    
    // Check cache first
    const cachedData = getCachedMovieData(cacheKey);
    if (cachedData && isMovieCacheValid(cacheKey)) {
      yield put(setCredits(cachedData));
      return;
    }
    
    yield put(setCreditsLoading(true));
    
    const credits = yield call(tmdbService.getMovieCredits, movieId);
    setCachedMovieData(cacheKey, credits);
    yield put(setCredits(credits));
    
  } catch (error) {
    yield* handleSagaError(error, 'MOVIE_DETAILS');
    yield put(setCreditsError(null));
  }
}

function* fetchSimilarMoviesSaga(action: ReturnType<typeof movieDetailsActions.fetchSimilarMovies>) {
  try {
    const { movieId } = action.payload;
    const cacheKey = getMovieCacheKey('similar', movieId);
    
    // Check cache first
    const cachedData = getCachedMovieData(cacheKey);
    if (cachedData && isMovieCacheValid(cacheKey)) {
      yield put(setSimilarMovies(cachedData));
      return;
    }
    
    yield put(setSimilarLoading(true));
    
    const result = yield call(tmdbService.getSimilarMovies, movieId);
    setCachedMovieData(cacheKey, result.results);
    yield put(setSimilarMovies(result.results));
    
  } catch (error) {
    yield* handleSagaError(error, 'MOVIE_DETAILS');
    yield put(setSimilarError(null));
  }
}

function* fetchPersonDetailsSaga(action: ReturnType<typeof movieDetailsActions.fetchPersonDetails>) {
  try {
    const { personId } = action.payload;
    const cacheKey = getMovieCacheKey('person', personId);
    
    // Check cache first
    const cachedData = getCachedMovieData(cacheKey);
    if (cachedData && isMovieCacheValid(cacheKey)) {
      yield put(setPersonDetails(cachedData));
      return;
    }
    
    yield put(setPersonLoading(true));
    
    const person = yield call(tmdbService.getPersonDetails, personId);
    setCachedMovieData(cacheKey, person);
    yield put(setPersonDetails(person));
    
  } catch (error) {
    yield* handleSagaError(error, 'PERSON_DETAILS');
    yield put(setPersonError(null));
  }
}

// Combined saga for fetching all movie data at once
function* fetchAllMovieDataSaga(action: ReturnType<typeof movieDetailsActions.fetchAllMovieData>) {
  try {
    const { movieId } = action.payload;
    
    // Set all loading states
    yield put(setMovieLoading(true));
    yield put(setCreditsLoading(true));
    yield put(setSimilarLoading(true));
    
    // Check cache for all data
    const movieCacheKey = getMovieCacheKey('movie', movieId);
    const creditsCacheKey = getMovieCacheKey('credits', movieId);
    const similarCacheKey = getMovieCacheKey('similar', movieId);
    
    const cachedMovie = getCachedMovieData(movieCacheKey);
    const cachedCredits = getCachedMovieData(creditsCacheKey);
    const cachedSimilar = getCachedMovieData(similarCacheKey);
    
    let movie, credits, similarResult;
    
    // Use cached data if available, otherwise fetch
    if (cachedMovie && isMovieCacheValid(movieCacheKey)) {
      movie = cachedMovie;
    } else {
      movie = yield call(tmdbService.getMovieDetails, movieId);
      setCachedMovieData(movieCacheKey, movie);
    }
    
    if (cachedCredits && isMovieCacheValid(creditsCacheKey)) {
      credits = cachedCredits;
    } else {
      credits = yield call(tmdbService.getMovieCredits, movieId);
      setCachedMovieData(creditsCacheKey, credits);
    }
    
    if (cachedSimilar && isMovieCacheValid(similarCacheKey)) {
      similarResult = { results: cachedSimilar };
    } else {
      similarResult = yield call(tmdbService.getSimilarMovies, movieId);
      setCachedMovieData(similarCacheKey, similarResult.results);
    }
    
    // Set all data
    yield put(setMovie(movie));
    yield put(setCredits(credits));
    yield put(setSimilarMovies(similarResult.results));
    
  } catch (error) {
    yield* handleSagaError(error, 'MOVIE_DETAILS');
    
    // Set errors for all failed requests
    yield put(setMovieError(null));
    yield put(setCreditsError(null));
    yield put(setSimilarError(null));
  }
}

// Watcher sagas
export function* movieDetailsSaga() {
  yield takeLatest('movieDetails/fetchMovieDetails', fetchMovieDetailsSaga);
  yield takeLatest('movieDetails/fetchMovieCredits', fetchMovieCreditsSaga);
  yield takeLatest('movieDetails/fetchSimilarMovies', fetchSimilarMoviesSaga);
  yield takeLatest('movieDetails/fetchPersonDetails', fetchPersonDetailsSaga);
  yield takeLatest('movieDetails/fetchAllMovieData', fetchAllMovieDataSaga);
} 